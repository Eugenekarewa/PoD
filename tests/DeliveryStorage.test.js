const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeliveryStorage", function () {
  let DeliveryStorage;
  let deliveryStorage;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    DeliveryStorage = await ethers.getContractFactory("DeliveryStorage");
    deliveryStorage = await DeliveryStorage.deploy();
    await deliveryStorage.waitForDeployment();
  });

  it("Should create a new delivery", async function () {
    const tx = await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "DeliveryCreated");

    expect(event.args.trackingId).to.equal(0);
    expect(event.args.nametag).to.equal("Test Delivery");
    expect(event.args.pickupStation).to.equal("Station A");
  });

  it("Should get delivery details", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    const delivery = await deliveryStorage.getDelivery(0);
    expect(delivery.nametag).to.equal("Test Delivery");
    expect(delivery.pickupStation).to.equal("Station A");
    expect(delivery.amount).to.equal(ethers.utils.parseEther("1.0"));
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

    const tx = await deliveryStorage.markVerified(0);
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "DeliveryVerified");

    expect(event.args.trackingId).to.equal(0);
  });

  it("Should issue payment for a verified delivery", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    await deliveryStorage.markVerified(0);
    const tx = await deliveryStorage.markPaid(0);
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "PaymentIssued");

    expect(event.args.trackingId).to.equal(0);
  });
});
