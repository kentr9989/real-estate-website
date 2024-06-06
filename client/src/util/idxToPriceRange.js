export const arrPriceRanges = [
    "0-300000",
    "300000-500000",
    "500000-700000",
    "700000-1000000",
    "Over $1,000,000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}