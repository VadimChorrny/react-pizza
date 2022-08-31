import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';

const CartItem = ({ id, title, type, imageUrl, count, price }) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      }),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      </div>
      <div className='cart__item-info'>
        <h3>{title}</h3>
        <p>{type}, 26 см.</p>
      </div>
      <div className='cart__item-count'>
        <button
          onClick={onClickMinus}
          className='button button--outline button--circle cart__item-count-minus'
        >
          -
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className='button button--outline button--circle cart__item-count-plus'
        >
          +
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count}</b>
      </div>
      <div className='cart__item-remove'>
        <button
          onClick={onClickRemove}
          className='button button--outline button--circle'
        >
          <img src='img/trash.svg' alt='img' />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
