'use client'

import React, { useEffect, useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import { FILE } from '../../dashboard/_components/FileList'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

function Canvas({
    onSaveTrigger,
    fileId,
    fileData,
}: {
    onSaveTrigger: any
    fileId: any
    fileData: FILE
}) {
    const [whiteBoardData, setWhiteBoardData] = useState<any>()
    const updateWhiteboard = useMutation(api.files.updateWhiteboard)

    useEffect(() => {
        if (onSaveTrigger) {
            saveWhiteboard()
        }
    }, [onSaveTrigger])

    const saveWhiteboard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData),
        }).then((resp) => console.log(resp))
    }

    return (
        <div className="h-full w-full">
            {fileData && (
                <Excalidraw
                    theme="light"
                    initialData={{
                        elements: fileData?.whiteboard
                            ? JSON.parse(fileData?.whiteboard)
                            : [],
                    }}
                    onChange={(excalidrawElements) =>
                        setWhiteBoardData(excalidrawElements)
                    }
                    UIOptions={{
                        canvasActions: {
                            saveToActiveFile: false,
                            loadScene: false,
                            export: false,
                            toggleTheme: false,
                        },
                    }}
                />
            )}
        </div>
    )
}

export default Canvas
