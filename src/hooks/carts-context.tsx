'use client';

import { getAddress } from '@/mocks/addresses';
import { B2BCart, OrderEntry } from '@/models/commerce-types';
import { getCostCenter } from '@/mocks/cost_centers';
import { dhl_standard, fedex_standard } from '@/mocks/delivery-modes';
import React from 'react';

type ContextStateType = {
  carts: Array<B2BCart>;
  nextCartNumber: number;
};

export type CartAction =
  | { type: 'ADD_CART'; payload: CreateCartProps }
  | { type: 'DELETE_CART'; payload: string }
  | { type: 'UPDATE_CART'; payload: B2BCart }
  | { type: 'UPDATE_ENTRIES'; payload: UpdateCartEntriesProps };

type CartsContextType = {
  carts: Array<B2BCart>;
  dispatch: React.Dispatch<CartAction>;
  getCartById: (code: string) => B2BCart | undefined;
  getCartByUser: (guid: string) => B2BCart | undefined;
  getCartsByOrgUnit: (orgUnit: string) => Array<B2BCart> | undefined;
  getNextCartCode: () => number;
  incrementNextCartCode: (n?: number) => void;
};

const CartsContext = React.createContext<CartsContextType | null>(null);

const intialState: ContextStateType = {
  carts: new Array(),
  nextCartNumber: 2783,
};

const cartReducer = (
  carts: Array<B2BCart>,
  action: CartAction
): Array<B2BCart> => {
  switch (action.type) {
    case 'ADD_CART':
      const newCart = createCart(action.payload);
      return [...carts, newCart];
    case 'DELETE_CART':
      return carts.filter((cart) => cart.code !== action.payload);
    case 'UPDATE_CART':
      return carts.map((cart) => {
        if (cart.code === action.payload.code) return action.payload;
        return cart;
      });
    case 'UPDATE_ENTRIES':
      const currentCart = carts.find(
        (cart) => cart.code === action.payload.code
      );
      if (!currentCart) return carts;
      return (
        updateEntries({
          carts,
          code: action.payload.code,
          entries: action.payload.entries,
          locale: action.payload.locale,
        }) || carts
      );
    default:
      return carts;
  }
};

const CartsProvider = ({ children }: { children: React.ReactNode }) => {
  const [nextCartCode, setNextCartCode] = React.useState<number>(
    Math.round(Math.random() * 10000)
  );
  const [carts, dispatch] = React.useReducer(cartReducer, new Array<B2BCart>());

  const getCartById = (code: string): B2BCart | undefined => {
    return carts.find((cart) => cart.code === code);
  };

  const getCartByUser = (guid: string): B2BCart | undefined => {
    return carts.find((cart) => cart.guid === guid);
  };

  const getCartsByOrgUnit = (orgUnit: string): Array<B2BCart> | undefined => {
    return carts.filter((cart) => cart.orgUnit === orgUnit);
  };

  const getNextCartCode = () => {
    return nextCartCode;
    incrementNextCartCode(Math.random() * 100);
  };

  const incrementNextCartCode = (amount: number = 1) => {
    setNextCartCode(nextCartCode + amount);
  };

  return (
    <CartsContext.Provider
      value={{
        carts,
        dispatch,
        getCartById,
        getCartByUser,
        getCartsByOrgUnit,
        getNextCartCode,
        incrementNextCartCode,
      }}
    >
      {children}
    </CartsContext.Provider>
  );
};

const useCartsContext = (): CartsContextType => {
  const context = React.useContext(CartsContext);
  if (!context) {
    throw new Error('useMockCarts must be used inside the MockCartsProvider');
  }
  return context;
};

export default useCartsContext;
export { CartsContext, CartsProvider };

/***** UTILITY FUNCTIONS *****/
/* CREATE CART */
export type CreateCartProps = {
  guid: string;
  orgUnit: string;
  locale: string;
};

const createCart = ({ guid, orgUnit, locale }: CreateCartProps): B2BCart => {
  const value = 0;

  const newCart: B2BCart = {
    code: '0000' + Math.round(Math.random() * 1000),
    guid: guid,
    orgUnit: orgUnit,
    entries: new Array<OrderEntry>(),
    totalItems: 0,
    totalUnitCount: 0,
    subTotal: {
      value,
    },
    totalDiscounts: {
      value,
    },
    totalTax: {
      value,
    },
    totalPriceWithTax: {
      value,
    },
    deliveryAddress: getAddress(orgUnit),
    deliveryMode: locale === 'de-DE' ? dhl_standard : fedex_standard,
    totalPrice: {
      value,
    },
    purchaseOrderNumber: 'po' + Math.round(Math.random() * 1000000),
    costCenter: getCostCenter(orgUnit),
    creationTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  };

  return newCart;
};

/* UPDATE ENTRIES */
export type UpdateCartEntriesProps = {
  carts?: Array<B2BCart>;
  code: string;
  entries: Array<OrderEntry>;
  locale: string;
};

const updateEntries = ({
  carts,
  code,
  entries,
  locale,
}: UpdateCartEntriesProps): Array<B2BCart> | undefined => {
  if (!carts) return;
  const currentCart = carts?.find((cart) => cart.code === code);
  if (!currentCart) return carts;

  const totalItems = entries.length;
  const deliveryFee = currentCart?.deliveryMode?.deliveryCost?.value || 0;

  let totalUnitCount = 0;
  let deliveryCost = { value: 0.0 };
  let subTotal = { value: 0.0 };
  let totalTax = { value: 0.0 };
  let totalPriceWithTax = { value: 0.0 };
  let totalPrice = { value: 0.0 };
  let updateTime = new Date().toISOString();

  if (entries) {
    entries?.forEach((entry) => {
      subTotal.value = subTotal.value + entry.totalPrice.value;
      totalUnitCount = totalUnitCount + entry.quantity;
    });
  }

  totalTax.value = locale === 'en-US' ? subTotal.value * 0.15 : 0;
  totalPriceWithTax.value = subTotal.value + totalTax.value;
  deliveryCost.value = subTotal.value * deliveryFee;
  totalPrice = {
    value: totalPriceWithTax.value + deliveryCost.value,
  };

  const modCart = {
    ...currentCart,
    entries,
    totalItems,
    totalUnitCount,
    subTotal,
    totalTax,
    totalPriceWithTax,
    totalPrice,
    updateTime,
  };

  const modCarts = carts.map((cart) => {
    if (cart.code === modCart.code) return modCart;
    return cart;
  });
  return modCarts;
};
