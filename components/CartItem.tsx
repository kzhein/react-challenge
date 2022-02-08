import { useContext } from 'react';
import { CartItem } from '../types';
import { CartStateContext } from '../utils/cartState';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { changeCartItemCount } = useContext(CartStateContext);

  const increaseCount = () => changeCartItemCount(item, 1);
  const decreaseCount = () => changeCartItemCount(item, -1);

  return (
    <div className='flex py-2 px-1' key={item.card.id}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.card.images.small} alt={item.card.name} className='h-24' />
      <div className='flex flex-col justify-between flex-1 pl-1'>
        <div>
          <p className='font-semibold text-lg'>{item.card.name}</p>
          <p className='text-gray-700'>
            <span className='font-medium'>
              ${item.card.cardmarket.prices.averageSellPrice}
            </span>
            per card
          </p>
        </div>
        <p className='text-gray-500'>{item.card.set.total} left</p>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='flex'>
          <p className='text-sky-500 font-semibold text-lg mr-1'>
            {item.quantity}
          </p>
          <div>
            {/* Hide the increase sign when the selected quantity is equal to number of stock left */}
            {item.quantity === item.card.set.total ? (
              <p className='text-sm text-red-600 cursor-pointer'>
                <i className='fas fa-times'></i>
              </p>
            ) : (
              <p
                className='text-sm text-sky-500 cursor-pointer'
                onClick={increaseCount}
              >
                <i className='fas fa-chevron-up'></i>
              </p>
            )}
            {/* Hide the decrease sign when the selected quantity is equal to one */}
            {item.quantity === 1 ? (
              <p className='text-sm text-red-600 cursor-pointer'>
                <i className='fas fa-times'></i>
              </p>
            ) : (
              <p
                className='text-sm text-sky-500 cursor-pointer'
                onClick={decreaseCount}
              >
                <i className='fas fa-chevron-down'></i>
              </p>
            )}
          </div>
        </div>
        <div>
          <p className='font-medium'>price</p>
          <p className='text-sky-500 font-semibold text-lg'>
            $
            {(
              item.card.cardmarket.prices.averageSellPrice * item.quantity
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
