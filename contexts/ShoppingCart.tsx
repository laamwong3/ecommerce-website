import { Cart } from "@chec/commerce.js/types/cart";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  useState,
} from "react";

interface ShoppingCartProps {
  children: React.ReactNode;
}

interface ShoppingCartState {
  cart: { loading: boolean; data?: Cart };
  order: CheckoutCaptureResponse | null;
}

interface ShoppingCartAction {
  type: ShoppingCartStatus;
  payload?: Cart | CheckoutCaptureResponse;
}

interface ShoppingCartContext {
  shoppingCart: {
    state: ShoppingCartState;
    dispatch: React.Dispatch<ShoppingCartAction>;
  };
  refreshCart: boolean;
  setRefreshCart: React.Dispatch<React.SetStateAction<boolean>>;
  refreshChckout: boolean;
  setRefreshChckout: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ShoppingCartStatus {
  CART_RETRIEVE_REQUEST = "CART_RETRIEVE_REQUEST",
  CART_RETRIEVE_SUCCESS = "CART_RETRIEVE_SUCCESS",
  CART_REFRESH = "CART_REFRESH",
  ORDER_SET = "ORDER_SET",
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
    case ShoppingCartStatus.ORDER_SET:
      return {
        ...state,
        order: action.payload,
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
  const [refreshCart, setRefreshCart] = useState(false);
  const [refreshChckout, setRefreshChckout] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const shoppingCart = { state, dispatch };

  return (
    <ShoppingCartStore.Provider
      value={{
        shoppingCart,
        refreshCart,
        setRefreshCart,
        refreshChckout,
        setRefreshChckout,
      }}
    >
      {children}
    </ShoppingCartStore.Provider>
  );
};

export default ShoppingCart;

export const useShoppingCart = () => useContext(ShoppingCartStore);
