import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import DateFormat from "../components/utilies/DateFormat";
import { BiSolidError } from "react-icons/bi";
import BackButton from "../components/utilies/BackButton";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="bg-[#f1f5fd] flex flex-col items-center justify-center gap-4 p-10 text-3xl text-sky-800 min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#075985" />
      </div>
    );

  if (!product)
    return (
      <div className="bg-[#f1f5fd] flex items-center justify-center p-10 text-3xl  text-red-900 min-h-screen">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! Product not found</p>
      </div>
    );

  const handleProductUpdate = (id) => {
    navigate(`/product/update/${id}`);
  };
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-2 items-center gap-6 px-10 border bg-gray-800 rounded-md">
      <div>
        <img
          className="w-full rounded-xl"
          src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="product-img"
        />
      </div>
      <div className="text-lg text-white text-left flex flex-col gap-2">
        <h1>
          <b>Name:</b> {product.product_name}
        </h1>

        <p>
          <b>Price: </b> {product.product_price} ${" "}
        </p>
        <p>
          <b>Stock: </b>
          {product.product_qty > 0 ? (
            <span className="text-white bg-green-600 px-6 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-white bg-red-600 px-6 rounded-full">
              Out of Stock
            </span>
          )}
        </p>
        <p>
          <b>Qty: </b>
          {product.product_qty}
        </p>

        <p>
          <b>Description: </b>
          {product.product_description}
        </p>

        <p>
          <b>Date Created: </b> <DateFormat dateString={product.createdAt}/>
        </p>

        <p>
          <b>Date Updated: </b> <DateFormat dateString={product.updatedAt}/>
        </p>

        <div className="mt-4 flex text-xl items-center gap-4">
          <button
            className="text-white font-semibold border bg-yellow-600 hover:bg-yellow-800 shadow shadow-white hover:shadow-none rounded-full px-4 py-2 file:transition-all delay-150"
            onClick={() => handleProductUpdate(product._id)}
          >
            Edit Product
          </button>
          <button className="text-white font-semibold border bg-red-600 hover:bg-red-800 shadow shadow-white hover:shadow-none rounded-full px-4 py-2 transition-all delay-150">
            Delete Product
          </button>
        </div>

        <BackButton route={"/"} />
      </div>
    </div>
  );
};

export default ProductDetails;
