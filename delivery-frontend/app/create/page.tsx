"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getContracts } from "@/lib/contracts"
import { ethers, parseEther } from "ethers"

export default function CreateDelivery() {
  const [formData, setFormData] = useState<{
    nametag: string
    pickupStation: string
    amount: string
    recipientName: string
    senderName: string
    recipientPhone: string
    senderPhone: string
  }>({
    nametag: "",
    pickupStation: "",
    amount: "",
    recipientName: "",
    senderName: "",
    recipientPhone: "",
    senderPhone: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask or another Ethereum wallet")
      }

      const { deliveryStorage } = await getContracts()

      if (!deliveryStorage || typeof deliveryStorage.createDelivery !== "function") {
        throw new Error("Contract not properly initialized")
      }

      const tx = await deliveryStorage.createDelivery(
        formData.nametag,
        formData.pickupStation,
        parseEther(formData.amount),
        formData.recipientName,
        formData.senderName,
        formData.recipientPhone,
        formData.senderPhone,
      )
      await tx.wait()
      router.push("/track")
    } catch (error: any) {
      console.error("Error creating delivery:", error)
      let errorMessage = "An unexpected error occurred"
      if (error.message) {
        errorMessage = error.message
      } else if (error.reason) {
        errorMessage = error.reason
      }
      alert(`Error creating delivery: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Delivery</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="nametag">Nametag</Label>
          <Input id="nametag" name="nametag" value={formData.nametag} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="pickupStation">Pickup Station</Label>
          <Input
            id="pickupStation"
            name="pickupStation"
            value={formData.pickupStation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount (ETH)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="senderName">Sender Name</Label>
          <Input id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="recipientPhone">Recipient Phone</Label>
          <Input
            id="recipientPhone"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="senderPhone">Sender Phone</Label>
          <Input id="senderPhone" name="senderPhone" value={formData.senderPhone} onChange={handleChange} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Delivery"}
        </Button>
      </form>
    </div>
  )
}