"use client";

import { createContext, useContext, useState, useCallback, useMemo, type PropsWithChildren } from "react";

interface CourierInfo {
  name: string;
  code: string;
  service: string;
  cost: number;
  etd: string;
  // Returned by multi-origin shipping endpoint.
  bestOriginDistrictId?: string;
}

interface CheckoutContextType {
  selectedCourierByShopId: Record<string, CourierInfo | null>;
  setSelectedCourierByShopId: (shopId: string, courier: CourierInfo | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType>({
  selectedCourierByShopId: {},
  setSelectedCourierByShopId: () => { }
});

export function CheckoutProvider({ children }: PropsWithChildren) {
  const [selectedCourierByShopId, setSelectedCourierByShopIdState] = useState<
    Record<string, CourierInfo | null>
  >({});

  const setSelectedCourierByShopId = useCallback((shopId: string, courier: CourierInfo | null) => {
    setSelectedCourierByShopIdState((prev) => ({ ...prev, [shopId]: courier }));
  }, []);

  const value = useMemo(
    () => ({ selectedCourierByShopId, setSelectedCourierByShopId }),
    [selectedCourierByShopId, setSelectedCourierByShopId]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
