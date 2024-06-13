import { Link } from "react-router-dom";
import { TbInfoSquareRounded } from "react-icons/tb";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const ProductTable = ({ data }) => {
  return (
    <table className="w-full border-separate border-spacing-1">
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
                <Link to={"/"}>
                  <TbInfoSquareRounded className="text-2xl text-green-600" />
                </Link>
                <Link to={"/"}>
                  <BiMessageSquareEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={"/"}>
                  <MdDeleteOutline className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
