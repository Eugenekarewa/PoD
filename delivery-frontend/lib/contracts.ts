declare global {
  interface Window {
    ethereum?: any;
  }
}

import { ethers, BrowserProvider, Contract } from "ethers"

// Import your contract artifacts
import DeliveryStorageArtifact from "../../artifacts/contracts/DeliveryStorage.sol/DeliveryStorage.json"
import DeliveryTrackerArtifact from "../../artifacts/contracts/DeliveryTracker.sol/DeliveryTracker.json"
import DeliveryVerifierArtifact from "../../artifacts/contracts/DeliveryVerifier.sol/DeliveryVerifier.json"
import PaymentIssuerArtifact from "../../artifacts/contracts/PaymentIssuer.sol/PaymentIssuer.json"

// Extract just the ABI from each artifact
const deliveryStorageABI = DeliveryStorageArtifact.abi
const deliveryTrackerABI = DeliveryTrackerArtifact.abi
const deliveryVerifierABI = DeliveryVerifierArtifact.abi
const paymentIssuerABI = PaymentIssuerArtifact.abi

const deliveryStorageAddress = "0x6565a7F6B9D2bB1850148d5E1d94C90CCFE9754a"
const deliveryTrackerAddress = "0x0f96E79f1084a1B75cF37807cceEb14564cBEc2E"
const deliveryVerifierAddress = "0x449A39750d0Ed8309b172a483951E52CDB29694D"
const paymentIssuerAddress = "0x523C863F9557989DE2414722B75C4C4D722EDC68"

export async function getContracts() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Ethereum provider not found")
  }

  await window.ethereum.request({ method: "eth_requestAccounts" })
  
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  
  const deliveryStorage = new Contract(deliveryStorageAddress, deliveryStorageABI, signer)
  const deliveryTracker = new Contract(deliveryTrackerAddress, deliveryTrackerABI, signer)
  const deliveryVerifier = new Contract(deliveryVerifierAddress, deliveryVerifierABI, signer)
  const paymentIssuer = new Contract(paymentIssuerAddress, paymentIssuerABI, signer)
  
  return { deliveryStorage, deliveryTracker, deliveryVerifier, paymentIssuer }
}