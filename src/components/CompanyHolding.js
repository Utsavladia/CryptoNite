import React, { useEffect, useState } from "react";
import { fetchCompanyHoldings } from "@/services/coinService"; // Adjust path as per your project structure

const CompanyHolding = ({ coin }) => {
  const [holding, setHolding] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCompanyHoldings(coin);
        console.log("Data fetched successfully:", data.companies);
        setHolding(data.companies || []); // Ensure data is an array, default to empty array if null
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company holdings:", error);
        setError("Error fetching data. Please try again later."); // Set error state
        setLoading(false);
      }
    };

    fetchData();
  }, [coin]);

  return (
    <div className=" bg-gray-900 text-white rounded-lg p-3 shadow-lg">
      {loading ? (
        <div>Loading...</div>
      ) : holding.length === 0 ? (
        <div>No data available</div>
      ) : (
        <table className="w-full text-base text-left bg-gray-900 rounded-lg cursor-pointer">
          <thead className=" text-base border-b border-slate-800   text-gray-500">
            <tr className="pb-6">
              <th scope="col" className="py-3 px-6">
                Name<span> • Symbol</span>
              </th>
              <th scope="col" className="py-3 px-6">
                Country
              </th>
              <th scope="col" className="py-3 px-6 ">
                Holdings
              </th>
              <th scope="col" className="py-3 px-6">
                $ Entry Value
              </th>
              <th scope="col" className="py-3 px-6">
                $ Current Value
              </th>
              <th scope="col" className="py-3 px-6 ">
                Percentage %
              </th>
            </tr>
          </thead>
          <tbody>
            {holding.map((hold, index) => (
              <tr
                key={index}
                className=" border-b border-slate-800 hover:bg-slate-700"
              >
                <td className="py-3 px-6 text-white text-base">
                  {hold.name}{" "}
                  <span className="text-gray-500">• {hold.symbol}</span>
                </td>
                <td className="py-4 px-6 text-white  text-base">
                  {hold.country}
                </td>
                <td className="py-4 px-6 text-yellow-500">
                  {hold.total_holdings}
                </td>
                <td className="py-4 px-6">$ {hold.total_entry_value_usd}</td>
                <td className="py-4 px-6">$ {hold.total_current_value_usd}</td>
                <td className="py-4 px-6 text-green-500">
                  {hold.percentage_of_total_supply} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompanyHolding;