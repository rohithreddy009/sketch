"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({params}:any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [focusedSide, setFocusedSide] = useState('both'); // 'both', 'document', or 'canvas'
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE|any>();

  useEffect(() => {
    console.log("FILEID", params.fileId)
    params.fileId && getFileData();
  }, [])

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {_id: params.fileId})
    setFileData(result);
  }

  const toggleFocus = (side: 'both' | 'document' | 'canvas') => {
    setFocusedSide(side);
  }

  return (
    <div className="flex flex-col h-screen">
      <WorkspaceHeader 
        onSave={() => setTriggerSave(!triggerSave)} 
        onToggleFocus={toggleFocus}
        focusedSide={focusedSide}
      />
      <div className={`flex-grow flex ${focusedSide === 'both' ? 'md:flex-row' : 'flex-col'}`}>
        <div className={`${focusedSide === 'canvas' ? 'hidden' : 'flex-1'} overflow-auto`}>
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        <div className={`${focusedSide === 'document' ? 'hidden' : 'flex-1'} overflow-auto border-l`}>
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace