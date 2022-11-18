import React, { createContext, FC, useContext, useReducer } from "react";

interface ShoppingCartProps {
  children: React.ReactNode;
}

interface ShoppingCartState {
  cart: { loading: boolean };
  order: string | null;
}

interface ShoppingCartAction {
  type: string;
}

interface ShoppingCartContext {
  shoppingCart: {
    state: ShoppingCartState;
    dispatch: React.Dispatch<ShoppingCartAction>;
  };
}

const ShoppingCartStore = createContext({} as ShoppingCartContext);

const reducer = (state: ShoppingCartState, action: ShoppingCartAction) => {
  switch (action.type) {
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
