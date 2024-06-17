import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import BackButton from "../components/utilies/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/${id}`
        );
        const productData = response.data;
        setProduct(productData);
        setName(productData.product_name);
        setQty(productData.product_qty);
        setPrice(productData.product_price);
        setDescription(productData.product_description);
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
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-3xl text-sky-800 min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#075985" />
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center p-10 text-3xl text-red-900 min-h-screen">
        <BiSolidError className="text-6xl" />
        <p>404! Product not found</p>
      </div>
    );

  // Handle form submit and product update
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
      const request = await axios.put(
        `${import.meta.env.VITE_APP_PRODUCT_ROUTE_URL}/update/${id}`,
        data
      );
      console.log(request);
      toast.success("Product updated successfully");
      setTimeout(() => {
        navigate(`/product/details/${id}`);
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gap-6 border bg-gray-800 rounded-md">
      <div className="w-full grid grid-cols-2 items-center justify-center">
        <div className="h-full min-h-screen update-bg"></div>
        <div className="grid gap-4 w-full py-2 px-10">
          <BackButton route={"/"} />
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <form
            action=""
            className="w-[100%] grid gap-4 border-2 border-white shadow-white shadow-md rounded-md p-4"
            onSubmit={handleSubmit}
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
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <PropagateLoader color="#fff" /> : "Update Product"}
            </button>
          </form>
        </div>

        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default EditProduct;
