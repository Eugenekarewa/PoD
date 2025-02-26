const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeliveryTracker", function () {
  let DeliveryStorage;
  let DeliveryTracker;
  let deliveryStorage;
  let deliveryTracker;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    DeliveryStorage = await ethers.getContractFactory("DeliveryStorage");
    DeliveryTracker = await ethers.getContractFactory("DeliveryTracker");
    deliveryStorage = await DeliveryStorage.deploy();
    await deliveryStorage.deployed();
    deliveryTracker = await DeliveryTracker.deploy(deliveryStorage.address);
    await deliveryTracker.deployed();
  });

  it("Should track delivery details", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    const delivery = await deliveryTracker.trackDelivery(0);
    expect(delivery.nametag).to.equal("Test Delivery");
    expect(delivery.pickupStation).to.equal("Station A");
    expect(delivery.amount).to.equal(ethers.utils.parseEther("1.0"));
    expect(delivery.recipientName).to.equal("Recipient");
    expect(delivery.senderName).to.equal("Sender");
    expect(delivery.recipientPhone).to.equal("1234567890");
    expect(delivery.senderPhone).to.equal("0987654321");
    expect(delivery.isVerified).to.be.false;
    expect(delivery.isPaid).to.be.false;
  });
});
