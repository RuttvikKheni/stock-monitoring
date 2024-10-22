import { useEffect, useState } from 'react';
import StockItem from '@/components/StockItem';
import { Stock } from '@/pages/Dashboard/Dashboard.types';

interface StockListProps {
  stocks: Stock[];
  onStockClick: (ticker: string) => void;
}


const StockList: React.FC<StockListProps> = ({ stocks, onStockClick }) => {
  const [selectedTicker, setSelectedTicker] = useState<string | null>(stocks?.[0]?.ticker);

  useEffect(() => {
    setSelectedTicker(stocks?.[0]?.ticker);
  }, [stocks.length])

  const handleItemClick = (ticker: string) => {
    setSelectedTicker(ticker);
    onStockClick(ticker);
  };

  return (
    <div className="stock-list-items">
      {stocks.map((stock: Stock) => (
        <StockItem
          key={stock.ticker}
          stock={stock}
          onClick={handleItemClick}
          isSelected={selectedTicker === stock.ticker}
        />
      ))}
    </div>
  );
};

export default StockList;
