import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className='container container--cart'>
      <div className='cart cart--empty'>
        <h2>
          Кошик пустий <icon>😕</icon>
        </h2>
        <p>
          Ймовірніше, ви не замовляли ще піцу.
          <br />
          Для того, щоб замовити піцу вам потрібно перейти на головну сторінку.
        </p>
        <img src='/img/empty-cart.png' alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Повернутись назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;