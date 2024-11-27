import React from 'react';

interface CategoryHeaderProps {
  categoryName: string;
  showCategoryTitle: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName, showCategoryTitle }) => {
  if (!showCategoryTitle || categoryName === 'Featured') return null;

  return (
    <span className="flex items-center mb-4">
      <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
      <div className="flex-1 border-t border-gray-300 ml-2"></div>
    </span>
  );
};

export default CategoryHeader;
