import { useCreateWorkSpaceValues } from '@/hooks/create-workspace-values'
import Image from 'next/image'
import { ImCancelCircle } from "react-icons/im";
import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing';

const ImageUpload = () => {

  const { imageUrl, updateImageURL } = useCreateWorkSpaceValues()

  if (imageUrl) {
    return <div className='flex items-center justify-center h-32 w-32 relative'>
      <Image src={imageUrl} className='object-cover w-full h-full rounded-sm' alt='workspace' width={320} height={320} />
      <ImCancelCircle className='absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110' />
    </div>
  }

  return (
    <UploadDropzone endpoint="workspaceImage" onClientUploadComplete={res => { updateImageURL(res?.[0].url) }}
      onUploadError={err => console.log(err)
      }
    />
  )
}

export default ImageUpload
