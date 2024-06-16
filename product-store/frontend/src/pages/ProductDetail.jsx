import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import DateFormat from "../components/utilies/DateFormat";
import { BiSolidError } from "react-icons/bi";
import BackButton from "../components/utilies/BackButton";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Modal from 'react-modal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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

  const handleProductDelete = async () => {
    try {
      const request = await axios.delete(`${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/delete/${id}`);
      console.log(request);
      toast.success(`${product.product_name} deleted successfully`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };

  const confirmDelete = () => {
    handleProductDelete();
    closeModal();
  };

  const handleProductUpdate = (id) => {
    navigate(`/product/update/${id}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-2 items-center gap-6 px-10 py-4 border bg-gray-800 rounded-md">

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
        className="flex items-center justify-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <BiSolidError className=" text-center text-5xl text-red-500"/>
          <h2 className="text-xl font-bold">Are you sure you want to delete <br /> <span className="text-green-600 font-bold">{product.product_name}?</span></h2>
          <p className="text-red-600 font-bold">This action cannot be reversed!</p>
          <div className="flex gap-6">
            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">No</button>
          </div>
        </div>
      </Modal>
      
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
          <button 
          className="text-white font-semibold border bg-red-600 hover:bg-red-800 shadow shadow-white hover:shadow-none rounded-full px-4 py-2 transition-all delay-150"
          onClick={openModal}
          >
            Delete Product
          </button>
        </div>

        <BackButton route={"/"} />

        <Toaster position="top-right" richColors/>
      </div>
    </div>
  );
};

export default ProductDetails;
