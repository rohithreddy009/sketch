import { Button } from '@/components/ui/button'
import { Link, Save, FileText, Edit3 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({onSave, onToggleFocus, focusedSide}: any) {
  return (
    <div className='p-3 border-b flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo-1.png'}
          alt='logo'
          height={40}
          width={40} />
        <h2>File Name</h2>
      </div>
      <div className='flex items-center gap-4'>
        <Button className='h-8 text-[12px] gap-2' 
          onClick={() => onToggleFocus('document')}
          variant={focusedSide === 'document' ? 'default' : 'outline'}>
          <FileText className='h-4 w-4' /> Document
        </Button>
        <Button className='h-8 text-[12px] gap-2' 
          onClick={() => onToggleFocus('both')}
          variant={focusedSide === 'both' ? 'default' : 'outline'}>
          Both
        </Button>
        <Button className='h-8 text-[12px] gap-2' 
          onClick={() => onToggleFocus('canvas')}
          variant={focusedSide === 'canvas' ? 'default' : 'outline'}>
          <Edit3 className='h-4 w-4' /> Canvas
        </Button>
        <Button className='h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600'
          onClick={() => onSave()}>
          <Save className='h-4 w-4' /> Save 
        </Button>
        <Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>
          Share <Link className='h-4 w-4' /> 
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader