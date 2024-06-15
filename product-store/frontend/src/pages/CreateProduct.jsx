import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import BackButton from "../components/utilies/BackButton";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = `${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/create`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !qty || !price || !description) {
      return toast.error("All fields must be filled");
    }

    const data = {
      product_name: name,
      product_qty: qty,
      product_price: price,
      product_description: description,
    };

    try {
      setIsLoading(true);
      const request = await axios.post(apiUrl, data);
      console.log(request);
       toast.success("Product created successfully");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    } catch (error) {
       console.log("Error: ", error);
        if (error.response && error.response.status === 409) {
            toast.error("Product already exists");
        } else {
            toast.error(error.message);
        }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen  gap-6 border bg-gray-800 rounded-md">
      <div className=" w-full grid grid-cols-2 items-center justify-center">
        <div className="h-full min-h-screen bg"></div>
        <div className="grid gap-4 w-full py-2 px-10">
          <BackButton route={"/"} />
          <h1 className="text-3xl font-bold text-white">Create Product</h1>
          <form
            action=""
            className="w-[100%] grid gap-4 border-2 border-white shadow-white shadow-md rounded-md p-4"
          >
            <label htmlFor="product_name" className="label">
              Product Name
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter product name"
                id="product_name"
                required
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </label>

            <label htmlFor="qty" className="label">
              Product Quantity
              <input
                type="number"
                name="qty"
                value={qty}
                placeholder="Enter product quantity"
                id="qty"
                required
                onChange={(e) => setQty(e.target.value)}
                className="input"
              />
            </label>

            <label htmlFor="price" className="label">
              Product Price
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Enter product price"
                id="price"
                required
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              />
            </label>

            <label htmlFor="description" className="label">
              Product Description
              <textarea
                name="description"
                value={description}
                placeholder="Enter description"
                id="description"
                cols="50"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              ></textarea>
            </label>

            <button
              className="text-white font-bold text-xl text-center border bg-green-600 hover:bg-green-800 rounded-md px-6 py-4 transition-all delay-150 flex items-center justify-center h-12"
              onClick={handleSubmit}
            >
              {isLoading ? <PropagateLoader color="#fff" /> : "Create Product"}
            </button>
          </form>
        </div>

        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default CreateProduct;
