import React, { useContext } from 'react';
import { Card } from '../types';
import { CartStateContext } from '../utils/cartState';

interface CardProps {
  cardData: Card;
}

const Card: React.FC<CardProps> = ({ cardData }) => {
  const { addToCart, removeFromCart, cart } = useContext(CartStateContext);

  const isSelected = cart.cartItems.find(item => item.card.id === cardData.id);

  // toggle card from the cart
  const handleClick = () => {
    if (isSelected) {
      removeFromCart(cardData);
    } else {
      addToCart(cardData);
    }
  };

  return (
    <div className='relative flex flex-col items-center mx-3'>
      <div className='bg-white absolute bottom-0 left-0 h-2/4 w-full rounded-xl'></div>
      <div className='z-10 flex flex-col items-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cardData.images.small}
          alt={cardData.name}
          className='md:h-72 lg:h-80'
        />
        <p className='text-xl font-semibold mt-1'>{cardData.name}</p>
        <p className='text-sm text-sky-500'>{cardData.rarity}</p>
        <div className='flex w-4/5 justify-around text-slate-500 my-1'>
          <p>${cardData.cardmarket.prices.averageSellPrice}</p>
          <p>{cardData.set.total} left</p>
        </div>
        <button
          type='button'
          className={` ${
            isSelected ? 'bg-black text-white' : 'bg-amber-300'
          } py-2 px-10 rounded-3xl font-medium translate-y-1/2`}
          onClick={handleClick}
        >
          {isSelected ? 'Selected' : 'Select Card'}
        </button>
      </div>
    </div>
  );
};

export default Card;
