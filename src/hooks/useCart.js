import { useCart } from '../context/CartContext';



export const useCartHook = () => {
  const cart = useCart();

  // Additional utility functions can be added here
  const isInCart = (productId) => {
    return cart.items.some(item => item.product._id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  return {
    ...cart,
    isInCart,
    getItemQuantity
  };
};

export default useCartHook;