interface FormatCurrency {
  value: string;
  currency: string;
}

export function formatCurrency({ value, currency }: FormatCurrency) {
  const numericValue = parseFloat(value) / 100;
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(numericValue);

  return formattedValue.toString();
}
