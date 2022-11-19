import { Cart } from "@chec/commerce.js/types/cart";
import React, { createContext, FC, useContext, useReducer } from "react";

interface ShoppingCartProps {
  children: React.ReactNode;
}

interface ShoppingCartState {
  cart: { loading: boolean; data?: Cart };
  order: string | null;
}

interface ShoppingCartAction {
  type: ShoppingCartStatus;
  payload?: Cart;
}

interface ShoppingCartContext {
  shoppingCart: {
    state: ShoppingCartState;
    dispatch: React.Dispatch<ShoppingCartAction>;
  };
}

export enum ShoppingCartStatus {
  CART_RETRIEVE_REQUEST = "CART_RETRIEVE_REQUEST",
  CART_RETRIEVE_SUCCESS = "CART_RETRIEVE_SUCCESS",
}

const ShoppingCartStore = createContext({} as ShoppingCartContext);

const reducer = (state: ShoppingCartState, action: ShoppingCartAction) => {
  switch (action.type) {
    case ShoppingCartStatus.CART_RETRIEVE_REQUEST:
      return { ...state, cart: { loading: true } } as ShoppingCartState;
    case ShoppingCartStatus.CART_RETRIEVE_SUCCESS:
      return {
        ...state,
        cart: { loading: false, data: action.payload },
      } as ShoppingCartState;
    default:
      return state;
  }
};
const initialState = {
  cart: { loading: true },
  order: null,
};

const ShoppingCart = ({ children }: ShoppingCartProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const shoppingCart = { state, dispatch };

  return (
    <ShoppingCartStore.Provider value={{ shoppingCart }}>
      {children}
    </ShoppingCartStore.Provider>
  );
};

export default ShoppingCart;

export const useShoppingCart = () => useContext(ShoppingCartStore);
