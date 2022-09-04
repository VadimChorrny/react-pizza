import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptySvg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className='container container--cart'>
      <div className='cart cart--empty'>
        <h2>
          Кошик пустий <span>😕</span>
        </h2>
        <p>
          Ймовірніше, ви не замовляли ще піцу.
          <br />
          Для того, щоб замовити піцу вам потрібно перейти на головну сторінку.
        </p>
        <img src={cartEmptySvg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Повернутись назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
