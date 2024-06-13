const ProductCard = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4 border-separate border-spacing-1">
      {data.map((product) => (
        <div key={product._id} className="relative p-4 border bg-gray-800 rounded-md flex flex-col gap-3">
          <img src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product-img" />
          <div className="text-white text-left text-lg">
            <p><b>Id: </b>{product._id} </p>
            <h1><b>Name:</b> {product.product_name}</h1>
            <p><b>Price: </b> {product.product_price} $ </p>
            <p><b>Qty: </b>{product.product_qty}</p>
          </div>
          <div className="absolute top-6 right-6">{
            product.product_qty > 0 ?
            <span className="text-white bg-green-600 px-6 py-1 rounded-full">In Stock</span>
            :
            <span className="text-white bg-red-600 px-6 py-1 rounded-full">Out of Stock</span>
            }</div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
