import { ethers } from "ethers"

const deliveryStorageABI = [
  /* Paste the DeliveryStorage ABI here */
]
const deliveryTrackerABI = [
  /* Paste the DeliveryTracker ABI here */
]
const deliveryVerifierABI = [
  /* Paste the DeliveryVerifier ABI here */
]
const paymentIssuerABI = [
  /* Paste the PaymentIssuer ABI here */
]

const deliveryStorageAddress = "0x6565a7F6B9D2bB1850148d5E1d94C90CCFE9754a"
const deliveryTrackerAddress = "0x0f96E79f1084a1B75cF37807cceEb14564cBEc2E"
const deliveryVerifierAddress = "0x449A39750d0Ed8309b172a483951E52CDB29694D"
const paymentIssuerAddress = "0x523C863F9557989DE2414722B75C4C4D722EDC68"

export async function getContracts() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Ethereum provider not found")
  }

  await window.ethereum.request({ method: "eth_requestAccounts" })
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const deliveryStorage = new ethers.Contract(deliveryStorageAddress, deliveryStorageABI, signer)
  const deliveryTracker = new ethers.Contract(deliveryTrackerAddress, deliveryTrackerABI, signer)
  const deliveryVerifier = new ethers.Contract(deliveryVerifierAddress, deliveryVerifierABI, signer)
  const paymentIssuer = new ethers.Contract(paymentIssuerAddress, paymentIssuerABI, signer)

  return { deliveryStorage, deliveryTracker, deliveryVerifier, paymentIssuer }
}

