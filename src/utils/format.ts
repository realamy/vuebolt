export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPricingType(type: string): string {
  const types: Record<string, string> = {
    fixed: 'Fixed Price',
    hourly: 'Per Hour',
    daily: 'Per Day',
    visit: 'Per Visit',
    square_meter: 'Per m²',
    linear_meter: 'Per Linear Meter',
  };
  return types[type] || type;
}

export function formatResponseTime(hours: number | null): string {
  if (!hours) return 'N/A';
  if (hours < 1) return 'Less than an hour';
  if (hours < 24) return `${hours} hours`;
  return `${Math.floor(hours / 24)} days`;
}

export function formatPercentage(value: number | null): string {
  if (value === null) return 'N/A';
  return `${Math.round(value)}%`;
}