'use client';

import Image from "next/image";
import Posts from "./components/Posts";
import Navbar from "./components/Navbar"



export default function Home() {
  return ( 
    <div>
    <Navbar></Navbar>

    <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
      <section className =" grid grid-cols-1 sm:grid-cols-12 gap-4">
         <div className="flex justify-center p-4 col-span-1 sm:col-span-3"><Posts category="tech-news"></Posts></div>
         <div className="flex justify-center p-4 col-span-1 sm:col-span-5"><Posts category="newsletter"></Posts></div>
         <div className="flex justify-center  p-4 col-span-1 sm:col-span-3"><Posts category="broker-news"></Posts></div>
      </section>

    </div>
    </div>


  );
}
