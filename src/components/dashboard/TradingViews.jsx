import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgress } from "@mui/material";
import { useFetchAllCoin } from "../../hooks/useFetchAllCoin";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { formatCurrency } from "../../utils/formatCurrency";

const TradingViews = () => {
  const { coin: selected, setCoin } = useContext(UserContext);

  const { coin, loading } = useFetchAllCoin(selected, 30);

  return (
    <div className="p-4 bg-neutral-900 text-white rounded flex-1 items-stretch">
      {/* selector */}
      <div className="mb-8 flex items-center justify-between">
        <div className="bg-card py-1 px-2 rounded focus:border-paper focus:border-[1px]">
          <select
            className="bg-neutral-500 p-2 outline-none text-sm font-bold"
            value={selected}
            onChange={(e) => setCoin(e.target.value)}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="tether">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
            <option value="tron">Tron</option>
          </select>
        </div>
        <div className="text-paper border-paper border-[1px] px-2 rounded cursor-pointer">
          1 Month
        </div>
      </div>
      {/* chart */}
      <div className="h-[300px] w-full">
        {loading && (
          <di className="flex items-center justify-center">
            <CircularProgress color="success" value={loading} />
          </di>
        )}
        {!loading && (
          <ResponsiveContainer height={"100%"} width="100%">
            <AreaChart data={coin}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickCount={4} />
              <YAxis
                dataKey="price"
                axisLine={false}
                interval="preserveStartEnd"
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#fff"
                strokeWidth={3}
                fill="url(#colorPv)"
              />
              <CartesianGrid vertical={false} opacity={0.4} />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip text-white bg-neutral-500 font-main p-2 rounded">
        <p className="label">on {label}</p>
        <p className="desc font-bold">{`Price was ${formatCurrency(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export default TradingViews;
