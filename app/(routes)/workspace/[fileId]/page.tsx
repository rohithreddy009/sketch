"use client"

import React, { useEffect, useState } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import Editor from '../_components/Editor';
import Canvas from '../_components/Canvas';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [focusedSide, setFocusedSide] = useState<'document' | 'both' | 'canvas'>('both');
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();
  }, [params.fileId]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });
    setFileData(result);
  };

  return (
    <div className="flex flex-col h-screen">
      <WorkspaceHeader 
        onSave={() => setTriggerSave(!triggerSave)}
        focusedSide={focusedSide}
        setFocusedSide={setFocusedSide}
      />
      <div className="flex-grow flex">
        {(focusedSide === 'both' || focusedSide === 'document') && (
          <div className={`${focusedSide === 'both' ? 'w-1/2' : 'w-full'} h-full overflow-auto`}>
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}
        {focusedSide === 'both' && (
          <div className="w-0.5 px-0.5 bg-gray-900 dark:bg-gray-900" />
        )}
        {(focusedSide === 'both' || focusedSide === 'canvas') && (
          <div className={`${focusedSide === 'both' ? 'w-1/2' : 'w-full'} h-full overflow-hidden`}>
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
