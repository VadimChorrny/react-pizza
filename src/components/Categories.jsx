import { useState } from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

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
