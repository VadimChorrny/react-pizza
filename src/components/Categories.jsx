import { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  const onClickCategory = (idx) => {
    setActiveIndex(idx);
  };
  return (
    <div className='categories'>
      <ul>
        {categories.map((res, idx) => (
          <li
            key={idx}
            onClick={() => onClickCategory(idx)}
            className={activeIndex === idx ? 'active' : ''}
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
