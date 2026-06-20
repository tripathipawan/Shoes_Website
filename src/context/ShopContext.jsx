/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import all_product from "../Utils/all_product";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext(null);

const PROMO_CODES = {
  'NIKE10': 10,
  'SAVE20': 20,
  'FIRST15': 15,
}

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}

// Load persisted state from localStorage
const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => loadFromStorage('cart', getDefaultCart()));
  const [wishlist, setWishlist] = useState(() => loadFromStorage('wishlist', []));

  // Promo code state
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');

  // Toast state
  const [toast, setToast] = useState(null);

  // Persist cart and wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const product = all_product.find(p => p.id === itemId);
    const shortName = product?.name?.split(' ').slice(0, 3).join(' ');
    showToast(`${shortName} added to cart!`);
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  }

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  }

  const increaseQty = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  const decreaseQty = (itemId) => {
    setCartItems((prev) => {
      const current = prev[itemId];
      if (current <= 1) return { ...prev, [itemId]: 0 };
      return { ...prev, [itemId]: current - 1 };
    });
  }

  const clearCart = () => {
    setCartItems(getDefaultCart());
    setDiscount(0);
    setAppliedPromo('');
    setPromoError('');
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    const discounted = totalAmount * (1 - discount / 100);
    return discounted.toFixed(2);
  }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalItem += cartItems[item];
    }
    return totalItem;
  }

  // Promo code functions
  const applyPromoCode = (code) => {
    const upperCode = code.trim().toUpperCase();
    if (appliedPromo) {
      setPromoError('A promo code is already applied.');
      return false;
    }
    if (PROMO_CODES[upperCode]) {
      setDiscount(PROMO_CODES[upperCode]);
      setAppliedPromo(upperCode);
      setPromoError('');
      showToast(`${upperCode} applied — ${PROMO_CODES[upperCode]}% off!`);
      return true;
    } else {
      setPromoError('Invalid code. Try: NIKE10, SAVE20, or FIRST15');
      return false;
    }
  }

  const removePromoCode = () => {
    setDiscount(0);
    setAppliedPromo('');
    setPromoError('');
    showToast('Promo code removed');
  }

  // Wishlist
  const toggleWishlist = (itemId) => {
    const isAdding = !wishlist.includes(itemId);
    setWishlist((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
    showToast(isAdding ? 'Added to wishlist ♡' : 'Removed from wishlist');
  }

  const isWishlisted = (itemId) => wishlist.includes(itemId);

  const contextValue = {
    all_product, cartItems, addToCart, removeFromCart, deleteFromCart,
    increaseQty, decreaseQty, clearCart,
    getTotalCartAmount, getTotalCartItems,
    wishlist, toggleWishlist, isWishlisted,
    discount, promoError, appliedPromo, applyPromoCode, removePromoCode,
    toast, showToast,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
