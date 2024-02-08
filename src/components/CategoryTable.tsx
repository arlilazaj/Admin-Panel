import React, { useState } from "react";
import { Category } from "../entities/Category";
import CreateCategories from "./CreateCategories";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

interface Props {
  categories: Category[];
}

const CategoryTable = ({ categories }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = useState<number | null>(null);
  const findProductById = (categoryId: number) => {
    return categories.find((categories) => categories.id === categoryId);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg px-20">
      <div className="grid grid-cols-3 place-content-center mb-5">
        <div></div>
        <h3 className="text-3xl text-center font-bold">Categories</h3>
        <button
          onClick={() => setShowModal(true)}
          className="place-self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create +
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Category
            </th>

            <th scope="col" className="px-6 py-3 ">
              Products
            </th>
            <th scope="col" className="px-6 py-3 ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {showModal ? (
            <CreateCategories onCancel={(cancel) => setShowModal(cancel)} />
          ) : null}

          {categories?.map((category) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={category.id}
            >
              <td className="px-6 py-4">{category.type}</td>
              <td>
                {category.products.map((products, index) => (
                  <span>
                    {products} {index < category.products.length - 1 && ","}
                  </span>
                ))}
              </td>
              <td className="px-6 py-6 text-right flex">
                <button
                  onClick={() => setShowEditModal(category.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2"
                >
                  Edit
                </button>
                <DeleteCategory id={category.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditCategory
          onCancel={() => setShowEditModal(null)}
          selectedProduct={findProductById(showEditModal)!}
        />
      )}
    </div>
  );
};

export default CategoryTable;
