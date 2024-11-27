import React from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  altText?: string;
  inlineText: boolean;
  isFirstPost: boolean;
  firstPostHasLargeImage: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  altText = 'Featured Image',
  inlineText,
  isFirstPost,
  firstPostHasLargeImage,
}) => {
  const imageClasses = `border object-cover ${isFirstPost && firstPostHasLargeImage ? 'w-[100vw] sm:w-[500px] lg:w-[800px]' : 'w-[300px]'} ${ inlineText ? 'w-[35vw] lg:w-[10vw]' : ''}`;

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
