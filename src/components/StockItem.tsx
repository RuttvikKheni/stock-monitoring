import { Stock } from '../pages/Dashboard/Dashboard.types';

interface StockItemProps {
  stock: Stock;
  onClick: (ticker: string) => void;
  isSelected: boolean;
}


const StockItem: React.FC<StockItemProps> = ({ stock, onClick, isSelected }) => {
  const { ticker, last, percentageChange } = stock;

  const percentageColor = percentageChange > 0 ? 'green' : percentageChange < 0 ? 'red' : 'black';

  return (
    <div
      className={`stock-item ${isSelected ? 'clicked' : ''} ${percentageColor}`}
      onClick={() => onClick(ticker)}
    >
      <span className={`stock-item-title ${percentageColor}`}>{ticker}</span>
      <div className='stock-numbers'>
        <span className='stock-number'>{last.toFixed(2)}</span>
        <span className={`stock-number-pr ${percentageColor}`}>{percentageChange.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default StockItem;
