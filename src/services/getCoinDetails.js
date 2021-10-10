const coinDataUrl = (id) => `https://api.coingecko.com/api/v3/coins/${id}?localization=en`;

 const getCoinDetails = async (id) => {
   return await fetch(coinDataUrl(id))
      .then((response) => response.json())
      .then((data) => {
        return {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          description: data.description,
          links: data.links,
          image: data.image,
          market_data: data.market_data.current_price.aud,
          market_cap: data.market_data.market_cap.aud,
          total_volume: data.market_data.total_volume.aud,

        };
      });
  };

  export default getCoinDetails;