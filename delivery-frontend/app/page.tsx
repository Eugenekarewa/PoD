import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageIcon, SearchIcon, ShieldCheckIcon } from "lucide-react"

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to DeliverEase
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Blockchain-powered delivery tracking for ultimate transparency and security.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/create">
                <Button>Create Delivery</Button>
              </Link>
              <Link href="/track">
                <Button variant="outline">Track Delivery</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4">
              <PackageIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Create Deliveries</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Easily create new deliveries with secure blockchain tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <SearchIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Track Packages</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Real-time tracking of your packages with full transparency.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <ShieldCheckIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Secure Verification</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Verify deliveries and process payments securely on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

