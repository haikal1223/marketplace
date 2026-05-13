import { formatDistanceStrict } from "date-fns/formatDistanceStrict";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */

export function getDateDifference(date: string | number | Date) {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

export function renderProductCount(page: number, perPageProduct: number, totalProduct: number) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }

  return `Showing ${startNumber + 1}-${endNumber} of ${totalProduct} products`;
}

/** List price minus percent discount; unit price charged to the customer. */
export function effectiveUnitPrice(price: number, discount: number): number {
  const p = Number.isFinite(price) ? price : 0;
  const d = Number.isFinite(discount) ? discount : 0;
  return Number((p - p * (d / 100)).toFixed(2));
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

export function calculateDiscount(price: number, discount: number) {
  return currency(effectiveUnitPrice(price, discount));
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

export function currency(price: number, fraction: number = 0) {
  return Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    maximumFractionDigits: fraction
  }).format(price);
}
