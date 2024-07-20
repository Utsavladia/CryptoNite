import { useRouter } from "next/router";
import Image from "next/image";

import { fetchCoinDataById, fetchCoinDataByDays } from "@/services/coinService";
import { useEffect, useState } from "react";
import ChartComponent from "@/components/ChartComponent";
import { formatMarketCap } from "@/utils";
import { PriceColor, PriceStatus } from "@/utils";

const ProductPage = () => {
  const [coin, setCoin] = useState(null);
  const [days, setDays] = useState(1);
  const [coinChart, setCoinChart] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const fetchdata = async () => {
        try {
          const data = await fetchCoinDataById(id);
          setCoin(data);
          console.log(data);
        } catch (error) {
          console.log("Error fetching coin data using id ", error);
        }
      };
      fetchdata();
    }
  }, [id]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchCoinDataByDays(days, id);
        console.log(data);
        setCoinChart(data.prices);
      } catch (error) {
        console.log(error, "Error fetching the data by days");
      }
    };
    fetchdata();
  }, [days, id]);

  const low = coin?.market_data.low_24h.usd;
  const high = coin?.market_data.high_24h.usd;
  const current = coin?.market_data.current_price.usd;

  const position24 = ((current - low) / (high - low)) * 100;

  const atl = coin?.market_data.atl.usd;
  const ath = coin?.market_data.ath.usd;
  const atp = ((current - atl) / (ath - atl)) * 100;
  const fitPosition24 = Math.max(Math.abs(position24 - 15), 15);
  const fitpositionat = Math.max(Math.abs(atp - 15), 15);

  const timeOptions = [1, 7, 30, 365];
  const handleTimeset = (time) => {
    setDays(time);
  };

  return (
    <div className="px-6 py-24 md:p-24 flex gap-6 md:flex-row flex-col">
      <div className="md:w-2/3 w-full">
        {coin ? (
          <div className="py-8 flex items-start justify-start flex-col">
            <div className=" py-3 flex items-center justify-start ">
              <Image
                src={coin.image.large}
                alt="Bitcoin"
                width={50}
                height={50}
              />
              <h2 class="ml-6 text-2xl lg:text-5xl leading-loose  font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-blue-600 ">
                {coin.name}
              </h2>
            </div>
            <div className="text-xl font-semibold flex items-center ">
              ${coin.market_data.current_price.usd}{" "}
              <span className="ml-6 text-sm ">
                <PriceStatus
                  value={
                    coin?.market_data.price_change_percentage_24h_in_currency
                      .usd
                  }
                />
              </span>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <div className="w-full flex flex-col ">
          {coinChart ? (
            <div className="flex max-w-full overflow-x-auto">
              <ChartComponent
                data={coinChart}
                title="Title here"
                label="Label here"
                days={days}
              />
            </div>
          ) : (
            <h1>Data not fetched yet</h1>
          )}
          <div className="mt-6 flex w-full items-center justify-center gap-4">
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`${
                  days === time ? "border-orange-600" : "border-gray-800"
                } border-2 px-2 py-1 rounded-lg`}
                onClick={() => {
                  handleTimeset(time);
                }}
              >
                {time}d
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start md:w-2/3 w-full md:mt-12 mt-24 gap-6">
          <h2 className="text-xl font-semibold mb-12">Performance</h2>

          {coin ? (
            <div className="relative w-full h-2 bg-gradient-to-r  from-red-500 to-green-500">
              <div className="absolute left-0 top-1 -translate-y-1/2 bg-gray-900 border-red-800 border px-4 py-2">
                ${coin.market_data.low_24h.usd}
              </div>
              <div className="absolute right-0 top-1 -translate-y-1/2 bg-gray-900 border-green-800 border px-4 py-2">
                ${coin.market_data.high_24h.usd}
              </div>
              <div
                className="absolute top-2 "
                style={{ left: `${fitPosition24}%` }}
              >
                <div class="w-0 h-0 border-l-[16px] border-l-transparent  border-b-[24px] border-b-yellow-500  border-r-[16px] border-r-transparent"></div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="flex w-full justify-between items-center px-4 font-semibold mb-8">
            <span>24h Low</span>
            <span>24h High</span>
          </div>
          {coin ? (
            <div className="relative w-full h-2 bg-gradient-to-r  from-red-500 to-green-500">
              <div className="absolute left-0 top-1 -translate-y-1/2 bg-gray-900 border-red-800 border px-4 py-2">
                ${coin.market_data.atl.usd}
              </div>
              <div className="absolute right-0 top-1 -translate-y-1/2 bg-gray-900 border-green-800 border px-4 py-2">
                ${coin.market_data.ath.usd}
              </div>
              <div
                className="absolute top-2 "
                style={{ left: `${fitpositionat}%` }}
              >
                <div class="w-0 h-0 border-l-[16px] border-l-transparent  border-b-[24px] border-b-yellow-500  border-r-[16px] border-r-transparent"></div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="flex w-full justify-between items-center  font-semibold mb-8">
            <span>All time Low</span>
            <span>All time High</span>
          </div>
          <table className="w-full md:text-base text-sm text-left bg-gray-900 rounded-t-lg cursor-pointer">
            <thead className=" text-base border-b border-slate-800   text-gray-500">
              <tr className="pb-6">
                <th scope="col" className="md:py-3 md:px-6 p-2">
                  7 Days
                </th>
                <th scope="col" className="md:py-3 md:px-6 p-2">
                  30 Days
                </th>
                <th scope="col" className="md:py-3 md:px-6 p-2">
                  1 Year
                </th>

                <th scope="col" className="md:py-3 md:px-6 p-2">
                  Today
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b border-slate-800 hover:bg-slate-700">
                <PriceColor
                  value={
                    coin?.market_data.price_change_percentage_7d_in_currency.usd
                  }
                />
                <PriceColor
                  value={
                    coin?.market_data.price_change_percentage_30d_in_currency
                      .usd
                  }
                />
                <PriceColor
                  value={
                    coin?.market_data.price_change_percentage_1y_in_currency.usd
                  }
                />
                <PriceColor
                  value={
                    coin?.market_data.price_change_percentage_24h_in_currency
                      .usd
                  }
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:w-1/3 w-full mt-40">
        <div className="w-full flex flex-col border-2 border-gray-800 rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-10 ">{coin?.name} Details</h1>
          <div className="flex justify-between items-center mb-3 text-gray-400">
            <h3>Market Cap</h3>
            <span>{formatMarketCap(coin?.market_data.market_cap.usd)}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-gray-400">
            <h3>Total Supply</h3>
            <span>{coin?.market_data.total_supply}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-gray-400">
            <h3>Max Supply</h3>
            <span>{coin?.market_data.max_supply}</span>
          </div>{" "}
          <div className="flex justify-between items-center mb-3 text-gray-400">
            <h3>Circulating Supply</h3>
            <span>{coin?.market_data.circulating_supply}</span>
          </div>
        </div>
        <div className="w-full flex flex-col border-2 border-gray-800 rounded-lg p-4 mt-4">
          <h1 className="text-xl font-semibold mb-6 ">About</h1>
          <h3 className="flex justify-between items-center mb-3 text-gray-400">
            {coin?.description.en.slice(0, 200)}...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
