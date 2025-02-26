const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentIssuer", function () {
  let DeliveryStorage;
  let PaymentIssuer;
  let deliveryStorage;
  let paymentIssuer;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    DeliveryStorage = await ethers.getContractFactory("DeliveryStorage");
    PaymentIssuer = await ethers.getContractFactory("PaymentIssuer");
    deliveryStorage = await DeliveryStorage.deploy();
    await deliveryStorage.deployed();
    paymentIssuer = await PaymentIssuer.deploy(deliveryStorage.address);
    await paymentIssuer.deployed();
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
    const tx = await paymentIssuer.issuePayment(0);
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "PaymentIssued");

    expect(event.args.trackingId).to.equal(0);
  });

  it("Should not issue payment for an unverified delivery", async function () {
    await deliveryStorage.connect(addr1).createDelivery(
      "Test Delivery",
      "Station A",
      ethers.utils.parseEther("1.0"),
      "Recipient",
      "Sender",
      "1234567890",
      "0987654321"
    );

    await expect(paymentIssuer.issuePayment(0)).to.be.revertedWith("Delivery not verified");
  });

  it("Should not issue payment for an already paid delivery", async function () {
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
    await paymentIssuer.issuePayment(0);
    await expect(paymentIssuer.issuePayment(0)).to.be.revertedWith("Payment already issued");
  });
});
