

import Image from "next/image";
import CategorySection from "./components/CategorySection";
import Navbar from "./components/Navbar";
import { GET_POSTS } from "./queries/getPosts";
import { PostsResponse, Post } from "./types";


const apiUrl : string = process.env.GRAPHQL_API_URL as string;

if (!apiUrl) {
  throw new Error('The GRAPHQL_API_URL environment variable is not defined');
}



  export default async function Home() {


      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        query: GET_POSTS,
        }),
        next: {revalidate: 10},
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
    
      const data: PostsResponse  = await response.json();
    
      let posts: Post[] = data?.data?.posts?.nodes || [];



    
      const interviewPosts = posts.filter((post) =>  {
        return post.categories.nodes.some((cat) => cat.slug === "interviews")
      }) 
      
      const filterByCategoryName = (category: string, posts: Post[]): Post[] => {
       return posts.filter((post) => post.categories.nodes.some((cat) => cat.slug === category))
      }


  return ( 
    <div>
    <Navbar></Navbar>

    <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
      <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4">
         <div className="flex justify-center p-4 col-span-1 sm:col-span-3">
          <CategorySection filteredPosts={filterByCategoryName("tech-news", posts)} numberOfPosts={5}></CategorySection>
         </div>
         <div className="flex justify-center p-4 col-span-1 sm:col-span-5">
         <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} numberOfPosts={5}></CategorySection>

         </div>
         <div className="flex justify-center  p-4 col-span-1 sm:col-span-3">
         <CategorySection filteredPosts={filterByCategoryName("broker-news", posts)} numberOfPosts={5}></CategorySection>
         </div>
      </main>

    </div>
    </div>


  );
}
