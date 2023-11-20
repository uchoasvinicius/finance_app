type CurrencyMap = { [key: string]: string };

export function getCurrencyFullName(acronym: string): string | undefined {
  const currencyMap: CurrencyMap = {
    USD: 'United States Dollar',
    EUR: 'Euro',
    BRL: 'Brazilian Real'
    // Add more currencies as needed
  };

  // Convert the input to uppercase to handle case-insensitive comparisons
  const upperCaseAcronym = acronym.toUpperCase();

  // Check if the provided acronym exists in the map
  if (Object.prototype.hasOwnProperty.call(currencyMap, upperCaseAcronym)) {
    return currencyMap[upperCaseAcronym];
  } else {
    // Return undefined for unsupported or unknown acronyms
    return undefined;
  }
}
