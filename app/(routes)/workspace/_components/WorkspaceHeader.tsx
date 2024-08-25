import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'

function WorkspaceHeader({ onSave, focusedSide, setFocusedSide }: any) {
    return (
        <div className="p-3 border-b flex justify-between items-center dark:bg-gray-800 dark:text-white">
            <div className="flex gap-2 items-center">
                <Image src={'/logo-1.png'} alt="logo" height={40} width={40} />
                <h2>File Name</h2>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    className={`h-10 px-4 text-sm font-medium rounded-lg shadow-md transition-colors ${focusedSide === 'document' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} dark:bg-blue-600 dark:hover:bg-blue-700`}
                    onClick={() => setFocusedSide('document')}
                >
                    Document
                </Button>
                <Button
                    className={`h-10 px-4 text-sm font-medium rounded-lg shadow-md transition-colors ${focusedSide === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} dark:bg-blue-600 dark:hover:bg-blue-700`}
                    onClick={() => setFocusedSide('both')}
                >
                    Both
                </Button>
                <Button
                    className={`h-10 px-4 text-sm font-medium rounded-lg shadow-md transition-colors ${focusedSide === 'canvas' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} dark:bg-blue-600 dark:hover:bg-blue-700`}
                    onClick={() => setFocusedSide('canvas')}
                >
                    Canvas
                </Button>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                    onClick={() => onSave()}
                >
                    <Save className="h-4 w-4" /> Save
                </Button>
                <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Share <Link className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default WorkspaceHeader
