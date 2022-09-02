import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6308922f46372013f580b035.mockapi.io/items/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Піца не знайшлась :(');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  return pizza.length ? (
    'Завантаження...'
  ) : (
    <div className='container'>
      <img src={pizza.imageUrl} alt='img' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}₴</h4>
    </div>
  );
};

export default FullPizza;
