import { useState } from "react";
import { Stock } from "@/pages/Dashboard/Dashboard.types";
import stockData from '@/static/data/stockData.json';

const stockTickers = 'NVDA,NFLX,JPM,PFE,SPY,GOOGL,AAPL,MSFT,TSLA,PYPL';


const useStockData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStock, setCurrentStock] = useState<Stock | undefined>();
  const [allStocks, setAllStocks] = useState<Stock[]>([]);

  const stockPriceProcess = (stockList: Stock[]) => {
    const processedStocks = stockList.map((stock: Stock) => {
      const { last, prevClose } = stock;
      const percentageChange = ((last - prevClose) / prevClose) * 100;
      return {
        ...stock,
        percentageChange,
      };
    });

    setCurrentStock(processedStocks?.[0]);
    setAllStocks(processedStocks);
  };

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.tiingo.com/iex/?tickers=${stockTickers}&token=${process.env.REACT_APP_STOCK_API_TOKEN}`);
      const stockResponse = await response.json();

      // here you will see I have added a static data because sometime above used API gave an error so to result correctly I have added static data 
      const stockList = stockResponse ?? stockData.stock;
      stockPriceProcess(stockList);
    } catch (error) {
      // here you will see I have added a static data because sometime above used API gave an error so to result correctly I have added static data 
      stockPriceProcess(stockData.stock as Stock[]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    allStocks,
    currentStock,
    setCurrentStock,
    fetchStocks,
  };
};

export default useStockData; 
