import { useContext, useState } from 'react';
import { CartStateContext } from '../utils/cartState';
import CartItem from './CartItem';

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { cart, clearCart } = useContext(CartStateContext);

  return (
    <div>
      {showCart ? (
        <div
          className={` ${
            isPaid ? 'h-2/5' : 'h-3/4'
          } bg-white rounded-xl w-96 lg:w-1/3 max-w-7xl fixed bottom-7 left-1/2 -translate-x-2/4 z-10 flex flex-col items-center pt-3 px-3`}
        >
          {/* Show payment success message if it is paid, otherwise show cart items */}
          {isPaid ? (
            <div className='flex-1 w-full flex flex-col justify-center items-center'>
              <i className='fas fa-check-circle text-8xl  text-green-500 mb-3'></i>
              <p className='text-xl font-medium'>Payment Success</p>
            </div>
          ) : (
            <>
              <div className='flex-1 w-full overflow-auto'>
                {cart.cartItems.map(item => (
                  <CartItem key={item.card.id} item={item} />
                ))}
              </div>
              {cart.cartItems.length > 0 && (
                <p
                  className='text-gray-700 text-sm underline cursor-pointer'
                  onClick={clearCart}
                >
                  Clear All
                </p>
              )}
              <div className='w-full py-3 px-14 mb-2'>
                <div className='flex justify-between items-center'>
                  <p className='text-lg font-medium'>Total cards</p>
                  <p className='text-lg font-medium text-red-600'>
                    {cart.cartItems.reduce(
                      (total, it) => total + it.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-xl font-medium'>Total price</p>
                  <p className='text-xl font-medium text-red-600'>
                    ${cart.totalPrice}
                  </p>
                </div>
              </div>
              {cart.cartItems.length > 0 && (
                <button
                  type='button'
                  className='bg-sky-500 py-2 px-10 rounded-3xl font-medium text-white'
                  onClick={() => {
                    setIsPaid(true);
                    clearCart();
                  }}
                >
                  Pay Now
                </button>
              )}
            </>
          )}

          <button
            type='button'
            className='bg-red-600 py-1 px-3 rounded-md text-white translate-y-1/2'
            onClick={() => {
              setShowCart(!showCart);
              setIsPaid(false);
            }}
          >
            <i className='fas fa-times'></i>
          </button>
        </div>
      ) : (
        <button
          type='button'
          className='bg-sky-500 text-white py-2 px-3 rounded-xl fixed bottom-7 left-1/2 -translate-x-2/4 z-10'
          onClick={() => setShowCart(!showCart)}
        >
          <i className='fas fa-shopping-cart mr-2'></i>View Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
