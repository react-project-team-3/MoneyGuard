import axios from 'axios';

const MONOBANK_API = 'https://api.monobank.ua/bank/currency';
const CACHE_KEY = 'currency_rates';
const CACHE_TIME_KEY = 'currency_rates_time';
const CACHE_DURATION = 60 * 60 * 1000;

export const getCurrencyRates = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedData && cachedTime) {
    const now = Date.now();
    const cacheAge = now - parseInt(cachedTime, 10);

    if (cacheAge < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }

  let response;
  try {
    response = await axios.get(MONOBANK_API);
  } catch (err) {
    // If rate limit or other transient error and we have cached data, return it as a fallback
    const status = err.response?.status;
    if (status === 429 && cachedData) {
      return JSON.parse(cachedData);
    }
    // otherwise rethrow to be handled upstream
    throw err;
  }

  const usdRate = response.data.find(
    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
  );
  const eurRate = response.data.find(
    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
  );

  const rates = [
    { currency: 'USD', rate: usdRate?.rateSell?.toFixed(2) || 'N/A' },
    { currency: 'EUR', rate: eurRate?.rateSell?.toFixed(2) || 'N/A' },
  ];

  localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

  return rates;
};
