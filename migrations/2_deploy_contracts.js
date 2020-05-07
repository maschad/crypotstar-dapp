/** @format */

const StarNotary = artifacts.require("StarNotary");

module.exports = function (deployer) {
	deployer.deploy(StarNotary, "NotaryStar", "NOS");
};
