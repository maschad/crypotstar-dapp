/** @format */
const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract("StarNotary", (accs) => {
	accounts = accs;
	owner = accounts[0];
});

it("can Create a Star", async () => {
	let tokenId = 1;
	let instance = await StarNotary.deployed();
	await instance.createStar("Awesome Star!", tokenId, { from: accounts[0] });
	assert.equal(await instance.tokenIdToStarInfo.call(tokenId), "Awesome Star!");
});

it("lets user1 put up their star for sale", async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let starId = 2;
	let starPrice = web3.utils.toWei(".01", "ether");
	await instance.createStar("awesome star", starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it("lets user1 get the funds after the sale", async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 3;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	await instance.createStar("awesome star", starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
	await instance.buyStar(starId, { from: user2, value: balance });
	let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
	let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
	let value2 = Number(balanceOfUser1AfterTransaction);
	assert.equal(value1, value2);
});

it("lets user2 buy a star, if it is put up for sale", async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 4;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	await instance.createStar("awesome star", starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
	await instance.buyStar(starId, { from: user2, value: balance });
	assert.equal(await instance.ownerOf.call(starId), user2);
});

it("lets user2 buy a star and decreases its balance in ether", async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 5;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	await instance.createStar("awesome star", starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
	const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
	await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
	const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
	let value =
		Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
	assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it("can add the star name and star symbol properly", async () => {
	const name = "BlackStarLine";
	const symbol = "BLK";
	let instance = await StarNotary.deployed();
	assert.equal(await instance.name.call(), name);
	assert.equal(await instance.symbol.call(), symbol);
});

it("lets 2 users exchange stars", async () => {
	// 1. create 2 Stars with different tokenId
	// 2. Call the exchangeStars functions implemented in the Smart Contract
	// 3. Verify that the owners changed
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId1 = 6;
	let starId2 = 7;
	await instance.createStar("User 1 Star", starId1, { from: user1 });
	await instance.createStar("User 2 Star", starId2, { from: user2 });
	await instance.exchangeStars(starId1, starId2, { from: user1 });

	assert.equal(await instance.ownerOf(starId2), user1);
	assert.equal(await instance.ownerOf(starId1), user2);
});

it("lets a user transfer a star", async () => {
	// 1. create a Star with different tokenId
	// 2. use the transferStar function implemented in the Smart Contract
	// 3. Verify the star owner changed.
	const instance = await StarNotary.deployed();
	const user1 = accounts[1];
	const user2 = accounts[2];

	const starId = 8;

	await instance.createStar("Transferrable star", starId, { from: user1 });
	await instance.transferStar(user2, starId, { from: user1 });
	assert.equal(await instance.ownerOf(starId), user2);
});

it("lookUptokenIdToStarInfo test", async () => {
	// 1. create a Star with different tokenId
	// 2. Call your method lookUptokenIdToStarInfo
	// 3. Verify if you Star name is the same
	let instance = await StarNotary.deployed();
	let user = accounts[1];
	let starId = 9;
	await instance.createStar("Look up Star", starId, { from: user });
	assert.equal(await instance.lookUptokenIdToStarInfo(starId), "Look up Star");
});
