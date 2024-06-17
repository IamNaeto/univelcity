import { TbInfoSquareRounded } from "react-icons/tb";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Modal from 'react-modal';
import { useState } from "react";
import { BiSolidError } from "react-icons/bi";


const ProductTable = ({ data, fetchData }) => {
  const [productId, setProductId] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate()

  // open modal and set the product id in state
  const openModal = (id) => {
    setModalIsOpen(true)
    setProductId(id)
  };

  // close modal and set the product id to null
  const closeModal = () => {
    setModalIsOpen(false)
    setProductId(null)
  };

  // handle product delete with delete product endpoint
  const handleProductDelete = async (id) => {
    try {
      const request = await axios.delete(`${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/delete/${productId}`);
      console.log(request);
      toast.success(`Product deleted successfully`);
      setTimeout(() => {
        fetchData()
      }, 2000);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };

  // call handle product delete function and close modal
  const confirmDelete = () => {
    handleProductDelete();
    closeModal();
  };

  // navigate to product info/details page with product id captured
  const handleProductInfo = (id) => {
    navigate(`/product/details/${id}`)
  }

  // navigate to product edit page with product id captured
  const handleEditProduct = (id) => {
    navigate(`/product/edit/${id}`)
  }

  return (
    <table className="w-full border-separate border-spacing-1">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
        className="flex items-center justify-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <BiSolidError className=" text-center text-5xl text-red-500" />
          <h2 className="text-xl font-bold">Are you sure you want to delete product?</h2>
          <p className="text-red-600 font-bold">This action cannot be reversed!</p>
          <div className="flex gap-6">
            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">No</button>
          </div>
        </div>
      </Modal>
      <thead>
        <tr>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">S/N</th>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">Product Name</th>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">Product Price</th>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">Product Quantity</th>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">Product Status</th>
          <th className="bg-sky-800 text-white border border-slate-600 rounded-md">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={product._id} className="h-8">
            <td className="border border-slate-900 rounded-md text-center">{index + 1}</td>
            <td className="border border-slate-900 rounded-md text-center">{product.product_name}</td>
            <td className="border border-slate-900 rounded-md text-center">{product.product_price} $</td>
            <td className="border border-slate-900 rounded-md text-center">{product.product_qty}</td>
            <td className="border border-slate-900 rounded-md text-center">
              {product.product_qty > 0 ? (
                <span className="text-white bg-green-600 px-6 rounded-full">In Stock</span>
              ) : (
                <span className="text-white bg-red-600 px-6 rounded-full">Out of Stock</span>
              )}</td>
            <td className="border border-slate-900 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <TbInfoSquareRounded
                  className="text-2xl text-green-600 hover:text-green-400 cursor-pointer delay-150 transition-colors"
                  onClick={() => (handleProductInfo(product._id))} />

                <BiMessageSquareEdit
                  className="text-2xl text-yellow-600 hover:text-yellow-400 cursor-pointer delay-150 transition-colors"
                  onClick={() => (handleEditProduct(product._id))}
                />

                <MdDeleteOutline
                  className="text-2xl text-red-600 hover:text-red-400 cursor-pointer delay-150 transition-colors"
                  onClick={() => (openModal(product._id))}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
