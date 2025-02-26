const { ethers, run } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DeliveryStorage contract
  const DeliveryStorage = await ethers.getContractFactory("DeliveryStorage");
  const deliveryStorage = await DeliveryStorage.deploy();
  await deliveryStorage.waitForDeployment();

  console.log("DeliveryStorage deployed to:", deliveryStorage.target);

  // Wait for 5 confirmations
  console.log("Waiting for 5 confirmations...");
  await deliveryStorage.deploymentTransaction().wait(5);

  // Verify DeliveryStorage contract
  console.log("Verifying DeliveryStorage contract...");
  await run("verify:verify", {
    address: deliveryStorage.target,
    constructorArguments: [],
  });

  // Deploy DeliveryTracker contract
  const DeliveryTracker = await ethers.getContractFactory("DeliveryTracker");
  const deliveryTracker = await DeliveryTracker.deploy(deliveryStorage.target);
  await deliveryTracker.waitForDeployment();

  console.log("DeliveryTracker deployed to:", deliveryTracker.target);

  // Wait for 5 confirmations
  console.log("Waiting for 5 confirmations...");
  await deliveryTracker.deploymentTransaction().wait(5);

  // Verify DeliveryTracker contract
  console.log("Verifying DeliveryTracker contract...");
  await run("verify:verify", {
    address: deliveryTracker.target,
    constructorArguments: [deliveryStorage.target],
  });

  // Deploy DeliveryVerifier contract
  const DeliveryVerifier = await ethers.getContractFactory("DeliveryVerifier");
  const deliveryVerifier = await DeliveryVerifier.deploy(deliveryStorage.target);
  await deliveryVerifier.waitForDeployment();

  console.log("DeliveryVerifier deployed to:", deliveryVerifier.target);

  // Wait for 5 confirmations
  console.log("Waiting for 5 confirmations...");
  await deliveryVerifier.deploymentTransaction().wait(5);

  // Verify DeliveryVerifier contract
  console.log("Verifying DeliveryVerifier contract...");
  await run("verify:verify", {
    address: deliveryVerifier.target,
    constructorArguments: [deliveryStorage.target],
  });

  // Log all contract addresses
  // Deploy PaymentIssuer contract
  const PaymentIssuer = await ethers.getContractFactory("PaymentIssuer");
  const paymentIssuer = await PaymentIssuer.deploy(deliveryStorage.target);
  await paymentIssuer.waitForDeployment();

  console.log("PaymentIssuer deployed to:", paymentIssuer.target);

  // Wait for 5 confirmations
  console.log("Waiting for 5 confirmations...");
  await paymentIssuer.deploymentTransaction().wait(5);

  // Verify PaymentIssuer contract
  console.log("Verifying PaymentIssuer contract...");
  await run("verify:verify", {
    address: paymentIssuer.target,
    constructorArguments: [deliveryStorage.target],
  });

  console.log("\nContract Addresses:");
  console.log("DeliveryStorage:", deliveryStorage.target);
  console.log("DeliveryTracker:", deliveryTracker.target);
  console.log("DeliveryVerifier:", deliveryVerifier.target);
  console.log("PaymentIssuer:", paymentIssuer.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
