import axios from 'axios';

const MONOBANK_API = 'https://api.monobank.ua/bank/currency';
const CACHE_KEY = 'currency_rates';
const CACHE_TIME_KEY = 'currency_rates_time';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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
    const status = err.response?.status;
    if (status === 429 && cachedData) {
      return JSON.parse(cachedData);
    }
    throw err;
  }

  const usdRate = response.data.find(
    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
  );
  const eurRate = response.data.find(
    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
  );

  const rates = [
    {
      currency: 'USD',
      purchase: usdRate?.rateBuy?.toFixed(2) || 'N/A',
      sale: usdRate?.rateSell?.toFixed(2) || 'N/A',
    },
    {
      currency: 'EUR',
      purchase: eurRate?.rateBuy?.toFixed(2) || 'N/A',
      sale: eurRate?.rateSell?.toFixed(2) || 'N/A',
    },
  ];

  localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

  return rates;
};