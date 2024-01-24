import { Products } from "../entities/Products";
import DeleteProduct from "./DeleteProduct";

interface Props {
  products: Products[];
}

const ProductsTable = ({ products }: Props) => {  
  return (
    <div className="relative overflow-x-auto sm:rounded-lg px-20">
      <div className="grid grid-cols-3 place-content-center mb-5">
        <div></div>
        <h3 className="text-3xl text-center font-bold">Products</h3>
        <button className="place-self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Create +
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Categories
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={product.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  src={product.image}
                  className="w-8 h-8 object-cover rounded"
                />
              </th>
              <td className="px-6 py-4">{product.type}</td>
              <td className="px-6 py-4">{product.price}$</td>
              <td className="px-6 py-4">{product.stock}</td>

              <td className="px-6 py-4">
                {product.categories.map((cat, index) => (
                  <span key={index}>
                    {cat} {index < product.categories.length - 1 && ","}
                  </span>
                ))}
              </td>
              <td className="px-6 py-6 text-right flex">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2">
                  Edit
                </button>
               <DeleteProduct id={product.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
