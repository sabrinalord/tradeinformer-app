'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect } from 'react';


const DynamicHeroAd: React.FC = () => {

  const [adIndex, setAdIndex] = useState<number>(0);

  const images = [
    "https://tradeinformer.com/wp-content/uploads/2024/08/850x165.png", 
    "https://tradeinformer.com/wp-content/uploads/2024/06/centroid900X175.png",
    "https://tradeinformer.com/wp-content/uploads/2024/04/TeamMember_850x165-jpg.webp"
  ]


  useEffect(() => {
   const randomIndex = Math.floor(Math.random() * images.length);
   setAdIndex(randomIndex);
  }, [images.length])

 
  const links = [
    "https://www.spotware.com/contact-us?utm_source=tradeinformer&utm_medium=email&utm_campaign=for_ibs_week_1&of_tpem=[subscriber:email]",
    "https://centroidsol.com/",
    "https://www.atfx.com/en/company-news/atfx-hires-siju-daniel-chief-commercial-officer?utm_source=tradeinformer&utm_medium=media_buy&utm_campaign=global_media_buy_tradeinformer_high_level_appointments"
  ]

    return (
      <div className="flex justify-center m-2 p-2">
        <Link href={links[adIndex]} target="_blank" rel="noopener noreferrer">
             <Image src={images[adIndex]} width={800} height={300} alt="advertisement"></Image>
        </Link>
      </div>
    )

}

export default DynamicHeroAd;