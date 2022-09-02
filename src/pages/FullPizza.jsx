import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPizzasById, pizzaSelector } from '../redux/slices/pizzasSlice';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6308922f46372013f580b035.mockapi.io/items/${id}`,
        );
        console.log('data', data);
        setPizza(data);
        console.log('pizza', pizza);
      } catch (error) {
        console.error('something went wrong', error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Завантаження...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='img' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
