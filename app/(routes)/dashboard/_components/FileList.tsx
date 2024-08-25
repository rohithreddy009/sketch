import { FileListContext } from '@/app/_context/FilesListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[] | null>(null);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 font-semibold text-gray-800 text-left">File Name</th>
              <th className="whitespace-nowrap px-6 py-3 font-semibold text-gray-800 text-left">Created At</th>
              <th className="whitespace-nowrap px-6 py-3 font-semibold text-gray-800 text-left">Edited</th>
              <th className="whitespace-nowrap px-6 py-3 font-semibold text-gray-800 text-left">Author</th>
              <th className="whitespace-nowrap px-6 py-3 font-semibold text-gray-800 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileList && fileList.map((file: FILE, index: number) => (
              <tr
                key={file._id}
                className="hover:bg-gray-50 cursor-pointer transition duration-200 ease-in-out"
                onClick={() => router.push('/workspace/' + file._id)}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{file.fileName}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {user && (
                    <Image
                      src={user?.picture}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <MoreHorizontal className="text-gray-600 hover:text-gray-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                      <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                        <Archive className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-700">Archive</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
