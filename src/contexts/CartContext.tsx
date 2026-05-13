"use client";

import { createContext, PropsWithChildren, useEffect, useMemo, useReducer } from "react";

const CART_STORAGE_KEY = "bazaar_cart";

// =================================================================================
type InitialState = { cart: CartItem[] };

export interface CartItem {
  id: string;
  qty: number;
  title: string;
  slug: string;
  price: number;
  thumbnail: string;
  weight?: number;
}

interface CartActionType {
  payload?: CartItem;
  type: "CHANGE_CART_AMOUNT" | "CLEAR_CART";
}

// =================================================================================

const INITIAL_STATE = { cart: [] as CartItem[] };

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

// ==============================================================
interface ContextProps {
  state: InitialState;
  dispatch: (args: CartActionType) => void;
}
// ==============================================================

export const CartContext = createContext<ContextProps>({} as ContextProps);

const reducer = (state: InitialState, action: CartActionType) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;

      if (!cartItem) return state;

      let existIndex = cartList.findIndex((item) => item.id === cartItem.id);

      // REMOVE ITEM IF QUANTITY IS LESS THAN 1
      if (cartItem.qty < 1) {
        const updatedCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: updatedCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (existIndex > -1) {
        const updatedCart = [...cartList];
        updatedCart[existIndex].qty = cartItem.qty;
        return { ...state, cart: updatedCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default: {
      return state;
    }
  }
};

export default function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => ({
    cart: loadCartFromStorage()
  }));

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  }, [state.cart]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
