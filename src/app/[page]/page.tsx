import React from 'react'
import { LoadPictureList } from '../page'



export default async function Home ({ params }: { params: { page: number } }) {
  
  let page = Number(params.page)
  if (isNaN(page)) {
    page = 1
  }
  const piclist = await LoadPictureList(page)
  return <div>
    {piclist}
  </div>
}
