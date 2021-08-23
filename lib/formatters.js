export const formatDecimal = places => value => value?.toFixed(places) ?? 'N/A'
export const formatPrice = formatDecimal(2)
