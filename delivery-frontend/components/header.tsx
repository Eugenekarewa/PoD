import Link from "next/link"
import { MountainIcon } from "lucide-react"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">DeliverEase</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/create">
          Create Delivery
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/track">
          Track Delivery
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/admin/verify">
          Verify Delivery
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/admin/pay">
          Issue Payment
        </Link>
      </nav>
    </header>
  )
}

