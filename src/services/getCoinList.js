const coinListUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=250&page=1&sparkline=false';

 const getCoinList = async () => {
   return await fetch(coinListUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          market_cap_rank: coin.market_cap_rank
        }));
      });
  };

  export default getCoinList;