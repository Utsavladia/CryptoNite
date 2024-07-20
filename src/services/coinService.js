import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const fetchCoinsMarketCap = async (page = 1, perpage = 20) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        page: page,
        per_page: perpage,
        price_change_percentage: "24h,7d,30d,1y",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coins market cap:", error);
    throw error;
  }
};

export const fetchChartMarketCap = async (selectedCoin) => {
  const now = new Date();
  const startOfDay =
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
  const endOfDay = startOfDay + 24 * 60 * 60;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart/range?vs_currency=usd&from=${startOfDay}&to=${endOfDay}`
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching the market cap chart data", error);
    throw error;
  }
};
export const fetchCompanyHoldings = async (coin) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/companies/public_treasury/${coin}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching company holding data", error);
    throw error;
  }
};

export const fetchCoinDataById = async (id) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data usign id ", error);
    throw error;
  }
};

export const fetchCoinDataByDays = async (day, id) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: day,
          precision: 2,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching days data ", error);
    throw error;
  }
};

export const fetchSuggestion = async (search) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/search?query=${search}`
    );
    const result = response.data.coins.slice(0, 7);
    return result;
  } catch (error) {
    console.log("Error fetching suggestions", error);
    throw error;
  }
};
