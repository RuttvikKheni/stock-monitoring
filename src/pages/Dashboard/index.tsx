import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { IoArrowUp } from "react-icons/io5";
import useStockData from '@/hooks/useStock';
import StockList from '@/pages/Dashboard/StockList';
import StockChart from '@/components/StockChart';
import { historicalData } from '@/static/data/chart';
import { Stock } from './Dashboard.types';
import './Dashboard.scss';


const Dashboard = () => {
  const { allStocks, currentStock, setCurrentStock, isLoading, fetchStocks } = useStockData();
  const [filterValue, setFilterValue] = useState<string | number>('');
  const [activeTab, setActiveTab] = useState<string>('chart');
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const filteredStocks = allStocks.filter(({ percentageChange }: { percentageChange: number }) => (filterValue ? percentageChange > Number(filterValue) : true)).sort((a: Stock, b: Stock) => {
    return isSorted
      ? a.percentageChange - b.percentageChange  
      : b.percentageChange - a.percentageChange; 
  });
  

  useEffect(() => {
    const savedFilter = localStorage.getItem('stockFilter');

    if (savedFilter) {
      setFilterValue(savedFilter);
    }
    fetchStocks();
  }, []);

  useEffect(() => {
    if (filteredStocks.length > 0) {
      setCurrentStock(filteredStocks[0]);
    }
  }, [filteredStocks.length]);

  const handleStockSelect = (ticker: string) => {
    const stockData = allStocks.find((stock: Stock) => stock.ticker === ticker);
    setCurrentStock(stockData);
  };

  const handleFilterChange = (value: string) => {
    const updatedFilterValue = value ? Number(value) : "";
    setFilterValue(updatedFilterValue);
    localStorage.setItem('stockFilter', updatedFilterValue.toString() ?? "");
  };

  const chartData = currentStock ? historicalData[currentStock.ticker] : historicalData[allStocks?.[0]?.ticker];

  return (
    <div className="App">
      <h1 className='App-title'>Stock Monitoring Dashboard</h1>

      {isLoading ? (
        <div className="loading">
          <p>Loading stocks...</p>
        </div>
      ) : (
        <div className='main-section'>
          <div className='stock-list'>
            <div className='input-field'>
              <input
                type="number"
                value={filterValue}
                onChange={(e) => handleFilterChange(e.target.value)}
                placeholder="Filter by percentage change"
                className='stock-list-input'
                disabled={isLoading}
              />
              <div>
                <Tooltip className='icon-tooltip' anchorSelect=".input-icon" place="top">
                  Sort by Percentage
                </Tooltip>
                <IoArrowUp className={`input-icon ${isSorted ? '' : 'rotate'}`} onClick={() => setIsSorted(!isSorted)} />
              </div>
            </div>

            <StockList stocks={filteredStocks} onStockClick={handleStockSelect} />
          </div>
          <div className='stock-section'>
            <div className='stock-chart-button'>
              <button
                className={`button ${activeTab === 'chart' ? 'active' : ''}`}
                onClick={() => setActiveTab('chart')}
                disabled={isLoading}
              >
                Stock Chart
              </button>
              <button
                className={`button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                disabled={isLoading}
              >
                Overview
              </button>
            </div>
            <div className='stock-content'>
              {activeTab === 'chart' && currentStock && chartData?.length > 0 && (
                <div className='stock-chart'>
                  <h2 className='stock-chart-title'>{currentStock.ticker} Historical Prices</h2>
                  <StockChart data={chartData} />
                </div>
              )}
              {activeTab === 'overview' && (
                <div className='overview-content'>
                  <h2 className='overview-title'>Overview</h2>
                  <p>This is the overview section for <b>{currentStock?.ticker || 'the stock'}</b>.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
