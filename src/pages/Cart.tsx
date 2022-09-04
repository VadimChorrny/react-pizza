import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';
import { cartSelector, clearItems } from '../redux/slices/cartSlice';
import cartSvg from '../assets/img/cart.svg';
import trashSvg from '../assets/img/trash.svg';
import grayArrowLeftSvg from '../assets/img/grey-arrow-left.svg';

type ItemType = {};

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(cartSelector);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0,
  );

  const onClickClear = () => {
    dispatch(clearItems());
  };

  return items.length > 0 ? (
    <div className='container container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>
            <img src={cartSvg} alt='img' />
            Корзина
          </h2>
          <div className='cart__clear'>
            <img src={trashSvg} alt='trash' />
            <span onClick={onClickClear}>Звільнити кошик</span>
          </div>
        </div>
        <div className='content__items'>
          {items.map((res: any, idx: number) => (
            <CartItem {...res} key={idx} />
          ))}
        </div>
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              {' '}
              Всього піц: <b>{totalCount} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сума замовлення: <b>{totalPrice}</b>{' '}
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <img src={grayArrowLeftSvg} alt='img' />
              <span>Повернутись назад</span>
            </Link>
            <div className='button pay-btn'>
              <span>Розрахуватись зараз</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CartEmpty />
  );
};

export default Cart;
