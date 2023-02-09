import { LoadArticleReadPage } from "@/server/articles/read";

export default async function Home({ params }: { params: { pk: string } }) {
    const articlePage = await LoadArticleReadPage(params.pk);
    return articlePage;
}