import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((res, idx) => (
          <li
            key={idx}
            onClick={() => onClickCategory(idx)}
            className={value === idx ? 'active' : ''}
          >
            {res}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

//rafce
