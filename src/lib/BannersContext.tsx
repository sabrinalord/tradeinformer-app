'use client';
import React, { createContext,  useContext, ReactNode } from 'react';

import { WidgetData } from '@/app/types';

interface BannersContextType {
    banners: WidgetData[];
  }

  const BannersContext = createContext<BannersContextType | undefined>(undefined);

  interface BannersProviderProps {
    children: ReactNode; 
    banners: WidgetData[];
  }

  export const BannersProvider: React.FC<BannersProviderProps> = ({ children, banners }) => {

  
    return (
      <BannersContext.Provider value={{ banners}}>
        {children}
      </BannersContext.Provider>
    );
  };
  
  export const useBanners = () => {
    const context = useContext(BannersContext);
    if (!context) {
      throw new Error('useBanners must be used within a BannersProvider');
    }
    return context;
  };