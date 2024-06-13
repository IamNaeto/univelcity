import React, { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import axios from "axios";
import { Toaster, toast } from "sonner";
import ProductCard from "../components/utilies/ProductCard";
import ProductTable from "../components/utilies/ProductTable";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  const toggleTable = () => {
    setShowType("table");
  };

  const toggleCard = () => {
    setShowType("card");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        const data = response.data;
        setData(data);
        console.log(data);
        toast.success("Data fetched successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-20 py-4">
      <Toaster position="top-right" richColors />
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-800 hover:bg-gray-800 px-6 py-2 rounded-md text-white font-bold transition-all delay-150"
          onClick={toggleTable}
        >
          Table
        </button>
        <button
          className="bg-sky-800 hover:bg-gray-800 px-6 py-2 rounded-md text-white font-bold transition-all delay-150"
          onClick={toggleCard}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-sky-800 my-8 font-bold">PRODUCT LIST</h1>
        <Link to="/">
          <MdAddBox className="text-sky-800 hover:text-gray-800 transition-all delay-150 text-4xl" />
        </Link>
      </div>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : showType === "table" ? (
          <ProductTable data={data} />
        ) : (
          <ProductCard data={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
