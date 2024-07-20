import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExploreCoins from "@/components/ExploreCoins";
import { fetchCoinsAction } from "@/redux/Actions/coinsAction";

const Explore = () => {
  const dispatch = useDispatch();
  const coinsState = useSelector((state) => state.coins.coins);
  const [coins, setCoins] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch coins from Redux state and set them to local state
  useEffect(() => {
    if (coinsState) {
      setCoins(coinsState); // Assuming coinsState.data contains the array of coins
    }
  }, [coinsState]);

  useEffect(() => {
    dispatch(fetchCoinsAction(currentPage));
  }, [dispatch]);

  const handlePrev = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    setCurrentPage(prevPage);
    dispatch(fetchCoinsAction(prevPage));
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(fetchCoinsAction(nextPage));
  };

  return (
    <main className="p-24 min-h-screen">
      <section className="w-full  flex flex-col items-baseline">
        <div className="p-12 flex gap-56 items-center justify-between">
          <h2 className="text-2xl lg:text-5xl leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-blue-600">
            Explore coins
          </h2>
          <div className="flex items-center justify-start">
            <button
              onClick={handlePrev}
              // disabled={currentPage === 1}
              className="px-4 py-2 rounded-l-lg bg-gray-900 hover:bg-gray-800"
            >
              {"<< Prev"}
            </button>
            <span className="text-base font-semibold px-4 py-2">
              {currentPage}
            </span>
            <button
              className="px-4 py-2 rounded-r-lg bg-gray-900 hover:bg-gray-800"
              onClick={handleNext}
              disabled={!coinsState || coinsState.length === 0}
            >
              {"Next >>"}
            </button>
          </div>
        </div>
        <ExploreCoins coins={coins} />
      </section>
    </main>
  );
};

export default Explore;
