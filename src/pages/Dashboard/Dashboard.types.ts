export interface Stock {
  askPrice: number | null;
  askSize: number | null;
  bidPrice: number | null;
  bidSize: number | null;
  high: number;
  last: number;
  lastSaleTimestamp: string;
  lastSize: number | null;
  low: number;
  mid: number | null;
  open: number;
  percentageChange: number;
  prevClose: number;
  quoteTimestamp: string;
  ticker: string;
  timestamp: string;
  tngoLast: number;
  volume: number;
}

export interface HistoricalPrice {
  date: string;
  price: number;
}

export interface HistoricalData {
  [key: string]: HistoricalPrice[];
}