import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('ed_cart');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // Migrate old format: { rental, quantity } → { item, quantity }
      return parsed.map((i) =>
        i.rental ? { item: { ...i.rental, type: i.rental.type || 'rental' }, quantity: i.quantity } : i
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ed_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateQty = (itemId, quantity) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const cartTotal = items.reduce((sum, i) => {
    const price = i.item.price_per_day;
    return price != null ? sum + price * i.quantity : sum;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
