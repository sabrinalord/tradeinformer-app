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
  const imageClasses = `border object-cover ${isFirstPost && firstPostHasLargeImage ? 'w-[100vw] lg:w-[800px] mb-4' : 'w-[150px] sm:w-[250px] lg:w-[300px]'} ${ inlineTextOnDesktop ? 'w-[150px] sm:w-[250px] lg:w-[150px]' : ''}`;

  return (
    <div className={`flex-shrink-0 `}>
      <Image
        className={imageClasses}
        src={src}
        width="800"
        height="800"
        alt={altText}
      />
    </div>
  );
};

export default ImageComponent;
