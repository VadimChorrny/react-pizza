import React from 'react';
import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const URL = 'https://6308922f46372013f580b035.mockapi.io/items';

const Home = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>
        {/* {items.map((res, idx) =>
              isLoading ? (
                <Skeleton {...res} key={idx} />
              ) : (
                <PizzaBlock {...res} key={idx} />
              ),
            )} */}
        {isLoading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((res, idx) => <PizzaBlock {...res} key={idx} />)}
      </div>
    </>
  );
};

export default Home;
