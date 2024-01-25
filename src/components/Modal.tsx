import { useEffect, useState } from "react";
import useCategories from "../hooks/useCategories";

interface Props {
  onCancel: (cancel: boolean) => void;
}

const Modal = ({ onCancel }: Props) => {
  const [textareaRows] = useState(8);
  const { data: categories } = useCategories();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCancel(false);
  };
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("modal-overlay")) {
        onCancel(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onCancel]);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 modal-overlay">
        <div className="bg-white p-8 rounded-md shadow-md w-1/3  max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="Name"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Price"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Price:
              </label>
              <input
                type="number"
                id="Price"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Stock"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Stock:
              </label>
              <input
                type="number"
                id="Stock"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Description:
              </label>
              <textarea
                name="Description"
                id="Description"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Specification"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Specification:
              </label>
              <textarea
                name="Specification"
                id="Specification"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Tag"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Tag:
              </label>
              <input
                name="Tag"
                type="text"
                id="Tag"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Reviews"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Reviews:
              </label>
              <textarea
                name="Reviews"
                id="Reviews"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="Categories"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Categories:
              </label>
              <select
                name="categories"
                id="Categories"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="" selected disabled>
                  Select an option
                </option>
                {categories?.result.map((category) => (
                  <option key={category.id}>{category.type}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="fileInput"
                className="relative cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md"
              >
                Choose photo
                <input id="fileInput" type="file" className="absolute hidden" />
              </label>
            </div>

            {/* Add more form fields as needed */}

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                onClick={() => onCancel(false)}
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
