import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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

  return !pizza ? (
    <div className='container'>Завантаження...</div>
  ) : (
    <div className='container'>
      <img src={pizza.imageUrl} alt='img' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}₴</h4>
    </div>
  );
};

export default FullPizza;
