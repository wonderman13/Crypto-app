import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import getCoinList from "./services/getCoinList";
import getCoinDetails from "./services/getCoinDetails";
import DataTable from "./components/DataTable";
import Spinner from "./components/Spinner";
import CoinInfoDailog from "./components/CoinInfoDailog";
import Error from "./components/Error";
import { PinDropSharp } from "@mui/icons-material";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [unFilteredCoin, setUnFilteredCoin] = useState([]);
  const [coinData, setCoinData] = useState(undefined);
  const [showSpinner, setShowSpinner] = useState(true);
  const [openDialog, setOpenDailog] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const data = getCoinList()
      .then((coins) => {
        setCoins(coins);
        setUnFilteredCoin(coins);
        setShowSpinner(false);
      })
      .catch((error) => {
        setError(true);
        setShowSpinner(false);
      });
  }, []);

  const filterCoinData = (filterTerm) => {
    let dataForFilter = unFilteredCoin;
    dataForFilter = dataForFilter.filter((item) => {
      return (
        item.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        item.symbol.toLowerCase().includes(filterTerm.toLowerCase())
      );
    });
    setCoins(dataForFilter);
  };

  const clearFilter = () => {
    setCoins(unFilteredCoin);
  };

  const getCoinData = (row) => {
    setShowSpinner(true);
    getCoinDetails(row.id)
      .then((coinData) => {
        setCoinData(coinData);
        setOpenDailog(true);
        setShowSpinner(false);
      })
      .catch((error) => {
        setError(true);
        setShowSpinner(false);
      });
  };

  if (showSpinner) {
    return <Spinner open={showSpinner} />;
  }

  return (
    <div>
      <SearchBar
        onFilterChange={(filterTerm) => filterCoinData(filterTerm)}
        clearFilter={() => clearFilter()}
      />
      {isError ? ( 
          <Error/>
      ) : null}
      {coinData ? (
        <CoinInfoDailog
          showInfo={openDialog}
          coinInfo={coinData}
          closeDailog={() => setOpenDailog(false)}
          isError={isError}
        />
      ) : null}
      {coins.length !== 0 ? (
        <DataTable rows={coins} onRowClick={(row) => getCoinData(row)} />
      ) : null}
    </div>
  );
};

export default App;
