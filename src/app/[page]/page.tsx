import React from "react";
import { Async, useAsync } from "react-async"
import { selectArticleModels, ArticleModel } from "@/models/article";
import styles from '../page.module.css'
import { calcPagination } from "@/utils/helpers";
import { LoadPictureList } from "../page";



export default async function Home({ params }: { params: { page: number } }) {
  console.debug("params22332", params)
  const page = Number(params.page)
  const piclist = await LoadPictureList(page)
  return <div>
    {piclist}
  </div>
}
