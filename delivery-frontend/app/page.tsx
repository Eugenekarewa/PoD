import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MountainIcon, PackageIcon, SearchIcon, ShieldCheckIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">DeliverEase</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
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
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 DeliverEase. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

