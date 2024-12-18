
'use client'
import { useEffect, useState } from 'react';
import { WidgetData, WidgetType } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface WidgetProps {
   type: WidgetType;
    data: WidgetData;
}

export default function Widget({type, data}: WidgetProps) {

    const isSidebar = type === 'sidebar';


    return (
     
    <div className={`flex justify-center mt-2 mb-4 p-2`}>
        <Link style={isSidebar ? { maxWidth: '400px' } : undefined} href={data.target_url} target="_blank" rel="noopener noreferrer">
             <Image src={data.image_url} width={800} height={300} alt="Widgetisement"></Image>
        </Link>
      </div>
     
    );
}