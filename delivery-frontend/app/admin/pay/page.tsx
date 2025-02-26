"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getContracts } from "@/lib/contracts"

export default function IssuePayment() {
  const [trackingId, setTrackingId] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add await here to properly resolve the Promise
      const { paymentIssuer } = await getContracts()
      const tx = await paymentIssuer.issuePayment(trackingId)
      await tx.wait()
      alert("Payment issued successfully!")
    } catch (error) {
      console.error("Error issuing payment:", error)
      alert("Error issuing payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Issue Payment (Admin)</h1>
      <form onSubmit={handlePay} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="trackingId">Tracking ID</Label>
          <Input id="trackingId" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Issuing Payment..." : "Issue Payment"}
        </Button>
      </form>
    </div>
  )
}