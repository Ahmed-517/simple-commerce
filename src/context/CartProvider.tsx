import { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  image: string;
  title: string;
  originalPrice: number;
  price: number;
  percentOff: number;
}

type cartItem = {
  product: Product;
  quantity: number;
};

interface CartContext {
  items: cartItem[];
  updateCart(product: Product, quantity: number): void;
  removeFromCart(product: Product): void;
  clearCart(): void;
  countAllItems(): number;
  countTotalPrice(): number;
}

const updateCartInLocalStorage = (products: cartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

const CartContext = createContext<CartContext>({
  items: [],
  updateCart() {},
  removeFromCart() {},
  clearCart() {},
  countAllItems() {
    return 0;
  },
  countTotalPrice() {
    return 0;
  },
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const updateCart = (product: Product, quantity: number) => {
    const updatedCartItems = [...cartItems];

    const index = cartItems.findIndex((item) => item.product.id === product.id);

    if (index === -1) {
      updatedCartItems.push({ product, quantity });
    } else {
      updatedCartItems[index].quantity += quantity;
    }

    if (updatedCartItems[index]?.quantity === 0) {
      // The quantity is 0, so remove the item
      // They are the same thing
      // updatedCartItems.splice(index, 1);
      removeFromCart(product);
    } else {
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    }
  };

  const removeFromCart = (product: Product) => {
    const newProducts = cartItems.filter(
      (item) => item.product.id !== product.id
    );

    setCartItems(newProducts);
    updateCartInLocalStorage(newProducts);
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartInLocalStorage([]);
  };

  const countAllItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const countTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

  useEffect(() => {
    const result = localStorage.getItem("cartItems");
    if (result) {
      setCartItems(JSON.parse(result));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart,
        removeFromCart,
        clearCart,
        countAllItems,
        countTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
