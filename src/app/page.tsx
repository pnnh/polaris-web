
import { LoadHomePage } from '@/server';
 
export default async function Home() {
  const homePage = LoadHomePage();
  return homePage;
}
