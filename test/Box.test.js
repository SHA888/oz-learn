// Load dependencies
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

// Import Open Zeppelin Test Environment
const { account, contract } = require('@openzeppelin/test-environment');

// Use the different accounts, which are unlocked and funded with Ether
const [ admin, deployer, user ] = accounts;

// Create a contract object from a compilation artifact
// const MyContract = contract.fromArtifact('MyContract');

// Load compiled artifacts
const Box = contract.fromArtifact('Box');

// Start test block
describe('Box', function() {
    const [ owner ] = accounts;

    // Use large integers ('big numbers)
    const value = new BN('42');

    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.contract = await Box.new({ from: owner });
    });

    // Test case 1
    it('retrieve returns a value previously stored', async function () {
        // Store a value
        await this.contract.store(value, { from: owner });
      

        // Test if the returned value is the same one
        // Note that we need to use strings to compare the 256 bit integers
        // Use large integer comparison
        expect(await this.contract.retrieve()).to.be.bignumber.equal(value);
    });

    // Test case 2
    it('store emits an event', async function () {
        const receipt = await this.contract.store(value, { from: owner });

        // Test that a ValueChanged event was emitted with the new value
        expectEvent(receipt, 'ValueChanged', { newValue: value });
    });

    // Test case 3
    it('non owner cannot store a value', async function () {
        // Test a transaction reverts
        await expectRevert(
            this.contract.store(value, { from: user }),
            'Ownable: caller is not the owner'
        );
    });
});
