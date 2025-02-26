"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getContracts } from "@/lib/contracts"

export default function VerifyDelivery() {
  const [trackingId, setTrackingId] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add await here to properly resolve the Promise
      const { deliveryVerifier } = await getContracts()
      const tx = await deliveryVerifier.verifyDelivery(trackingId)
      await tx.wait()
      alert("Delivery verified successfully!")
    } catch (error) {
      console.error("Error verifying delivery:", error)
      alert("Error verifying delivery. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Verify Delivery (Admin)</h1>
      <form onSubmit={handleVerify} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="trackingId">Tracking ID</Label>
          <Input id="trackingId" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Delivery"}
        </Button>
      </form>
    </div>
  )
}
