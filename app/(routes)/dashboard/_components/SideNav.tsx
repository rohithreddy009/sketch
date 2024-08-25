import { Archive, ChevronDown, Flag, Github } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SideNavTopSection, { TEAM } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    if (activeTeam) getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: '',
      whiteboard: '',
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast('File created successfully!');
        }
      },
      (e) => {
        toast('Error while creating file');
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div
      className='fixed h-screen w-64 border-r border-gray-200 bg-white p-4 flex flex-col'
    >
      {/* Top Section */}
      <div className='flex-1 mb-4'>
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      {/* Bottom Section */}
      <div className='mt-auto'>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav;
