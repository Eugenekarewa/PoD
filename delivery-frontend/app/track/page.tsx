"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getContracts } from "@/lib/contracts"

export default function TrackDelivery() {
  const [trackingId, setTrackingId] = useState("")
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { deliveryTracker } = getContracts()
      const info = await deliveryTracker.trackDelivery(trackingId)
      setDeliveryInfo(info)
    } catch (error) {
      console.error("Error tracking delivery:", error)
      alert("Error tracking delivery. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Delivery</h1>
      <form onSubmit={handleTrack} className="space-y-4 max-w-md mb-8">
        <div>
          <Label htmlFor="trackingId">Tracking ID</Label>
          <Input id="trackingId" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Tracking..." : "Track Delivery"}
        </Button>
      </form>

      {deliveryInfo && (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
          <p>
            <strong>Nametag:</strong> {deliveryInfo.nametag}
          </p>
          <p>
            <strong>Pickup Station:</strong> {deliveryInfo.pickupStation}
          </p>
          <p>
            <strong>Amount:</strong> {deliveryInfo.amount.toString()} Wei
          </p>
          <p>
            <strong>Recipient Name:</strong> {deliveryInfo.recipientName}
          </p>
          <p>
            <strong>Sender Name:</strong> {deliveryInfo.senderName}
          </p>
          <p>
            <strong>Recipient Phone:</strong> {deliveryInfo.recipientPhone}
          </p>
          <p>
            <strong>Sender Phone:</strong> {deliveryInfo.senderPhone}
          </p>
          <p>
            <strong>Verified:</strong> {deliveryInfo.isVerified ? "Yes" : "No"}
          </p>
          <p>
            <strong>Paid:</strong> {deliveryInfo.isPaid ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  )
}

