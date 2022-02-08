import { CartItem } from '../types';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
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
            </span>{' '}
            per card
          </p>
        </div>
        <p className='text-gray-500'>{item.card.set.total} left</p>
      </div>
      <div className='flex flex-col justify-between'>
        <div>
          <p className='text-sky-500 font-semibold text-lg'>{item.quantity}</p>
        </div>
        <div>
          <p className='font-medium'>price</p>
          <p className='text-sky-500 font-semibold text-lg'>
            {item.card.cardmarket.prices.averageSellPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
