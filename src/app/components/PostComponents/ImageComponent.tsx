import React from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  altText?: string;
  inlineTextOnDesktop: boolean;
  isFirstPost: boolean;
  firstPostHasLargeImage: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  altText = 'Featured Image',
  inlineTextOnDesktop,
  isFirstPost,
  firstPostHasLargeImage,
}) => {
  const imageClasses = `
    border object-cover
    ${inlineTextOnDesktop ? 'lg:w-[8vw] lg:h-[80px]' : ''}
    ${isFirstPost && firstPostHasLargeImage ? 'w-full lg:w-[280px] lg:h-[150px]' : ''}
    ${!isFirstPost || !firstPostHasLargeImage ? 'w-[130px] h-[100px] sm:w-[280px] sm:h-[150px]' : ''}
  `;

  return (
    <div className={`flex-shrink-0 `}>     
     <Image
        className={imageClasses}
        src={src}
        width="500"
        height="500"
        alt={altText}
      />
    </div>
  );
};

export default ImageComponent;
