const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeliveryVerifier", function () {
  let DeliveryStorage;
  let DeliveryVerifier;
  let deliveryStorage;
  let deliveryVerifier;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    DeliveryStorage = await ethers.getContractFactory("DeliveryStorage");
    DeliveryVerifier = await ethers.getContractFactory("DeliveryVerifier");
    deliveryStorage = await DeliveryStorage.deploy();
    await deliveryStorage.deployed();
    deliveryVerifier = await DeliveryVerifier.deploy(deliveryStorage.address);
    await deliveryVerifier.deployed();
  });

  it("Should verify a delivery", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    const tx = await deliveryVerifier.verifyDelivery(0);
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "DeliveryVerified");

    expect(event.args.trackingId).to.equal(0);
  });

  it("Should not verify an already verified delivery", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    await deliveryVerifier.verifyDelivery(0);
    await expect(deliveryVerifier.verifyDelivery(0)).to.be.revertedWith("Delivery already verified");
  });
});
