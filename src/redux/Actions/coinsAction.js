// src/redux/coinActions.js

import { setCoins, setLoading } from "../Reducers/coinsMarketCapSlice";
import { fetchCoinsMarketCap } from "../../services/coinService";

const perpage = 20;
export const fetchCoinsAction =
  (page = 1) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchCoinsMarketCap(page, perpage);
      console.log(data);
      dispatch(setCoins(data));
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
