"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Wallet, CreditCard, ReceiptText, LifeBuoy, Settings, Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AuthAPI } from "@/lib/API/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useDashboardStore } from "@/app/store/zustandstore/useStore"


interface SidebarProps {
  username?: string
  email?: string
}

export default function Sidebar({ username = "Yusuf", email = "yusufababa50@gmail.com" }: SidebarProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const userDetails = useDashboardStore((state) => state.userDetails)
    const userProfile = useDashboardStore((state) => state.userProfile)

  const mainRoutes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Image src="/homeIcon.png" alt="logo" width={30} height={30} className="h-5 w-5" />,
    },
    {
      name: "My Wallet",
      path: "/dashboard/wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      name: "Device SIM",
      path: "/dashboard/device-sim",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Bill Payments",
      path: "/dashboard/bills",
      icon: <ReceiptText className="h-5 w-5" />,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <ReceiptText className="h-5 w-5" />,
    },
  ]

  const bottomRoutes = [
    {
      name: "Support",
      path: "/dashboard/support",
      icon: <LifeBuoy className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const handleLogout = async () => {
    await AuthAPI.logout()
  }

  return (
    <>
      {/* Mobile menu button - moved to the right */}
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-background transition-transform duration-200 ease-in-out border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Image src="/simcard.png" alt="Simkash Logo" width={32} height={32} />
            <span className="text-xl font-bold text-slate-800">simkash</span>
          </Link>
        </div>

        {/* Main navigation links */}
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {mainRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === route.path ? "bg-[#EFF9FC] text-[#132939]" : "hover:bg-muted",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section with support, settings, and user info */}
        <div className="mt-auto  pt-4 pb-6">
          <ul className="space-y-1 px-2">
            {bottomRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === route.path ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User info section */}
          <div className="mt-4 px-3">
            <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                
              <div className=" lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium text-gray-600">
                      {userProfile?.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className=" bg-white w-full p-6 border border-gray-300 rounded-2xl space-y-2  ">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userProfile?.fullname}</p>
                    <p className="text-xs text-muted-foreground">{userDetails?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex w-full cursor-pointer items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <h1 className="text-sm">

                    Dashboard
                    </h1>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/wallet" className="flex w-full cursor-pointer items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    My Wallet
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex w-full cursor-pointer items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-200  "
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
