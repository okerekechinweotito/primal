export const fetchCoins = (page) =>
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=false&page=${page}`
  ).then((res) => res.json());