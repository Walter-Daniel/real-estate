export const formatPriceToFloat = (price: string): number => {
  const cleanedPrice = price.replace(/\./g, "");
  const formattedPrice = cleanedPrice.replace(",", ".");
  const priceFloat = parseFloat(formattedPrice);
  return priceFloat;
}
