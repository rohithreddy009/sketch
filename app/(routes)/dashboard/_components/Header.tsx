import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user }: any = useKindeBrowserClient()

    return (
        <div className="flex justify-between items-center w-full py-2 px-4 bg-white shadow-sm">
            {/* Left Content (Logo or Placeholder) */}
            <div className="flex items-center">
                {/* Placeholder for logo or other content */}
            </div>

            {/* Center Search Input */}
            <div className="flex items-center border rounded-md p-1 bg-gray-100">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-2 bg-transparent border-none focus:outline-none w-full text-sm"
                />
            </div>

            {/* Right User Info and Button */}
            <div className="flex items-center gap-3">
                {user && (
                    <Image
                        src={user?.picture}
                        alt="user"
                        width={28}
                        height={28}
                        className="rounded-full border border-gray-200 shadow-sm"
                    />
                )}
                <Button className="flex items-center gap-2 text-sm h-8 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-150">
                    <Send className="h-4 w-4" />
                    Invite
                </Button>
            </div>
        </div>
    )
}

export default Header
