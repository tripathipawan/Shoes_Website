/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import all_product from "../Utils/all_product";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext(null);

const getDefaultCart = ()=> {
    let cart = {};
    for (let index= 0; index<all_product.length+1; index++){
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlist, setWishlist] = useState([]);

    const addToCart = (itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]+1}))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=> ({...prev,[itemId]:Math.max(0, prev[itemId]-1)}))
    }

    const deleteFromCart = (itemId) => {
        setCartItems((prev)=> ({...prev,[itemId]:0}))
    }

    const increaseQty = (itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]+1}))
    }

    const decreaseQty = (itemId) => {
        setCartItems((prev)=> {
            const current = prev[itemId]
            if (current <= 1) {
                return {...prev, [itemId]: 0}
            }
            return {...prev, [itemId]: current - 1}
        })
    }

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                if (itemInfo) totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount.toFixed(2);
    }

    const getTotalCartItems = ()=> {
        let totalItem = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }

    // Wishlist
    const toggleWishlist = (itemId) => {
        setWishlist((prev) =>
            prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        )
    }

    const isWishlisted = (itemId) => wishlist.includes(itemId)

    const contextValue = {
        all_product, cartItems, addToCart, removeFromCart, deleteFromCart,
        increaseQty, decreaseQty,
        getTotalCartAmount, getTotalCartItems,
        wishlist, toggleWishlist, isWishlisted
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider