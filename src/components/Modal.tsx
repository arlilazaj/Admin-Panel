import { ChangeEvent, useEffect, useState } from "react";
import useCategories from "../Categoryhooks/useCategories";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateProducts from "../Producthooks/useCreateProducts";
interface Props {
  onCancel: (cancel: boolean) => void;
}
const schema = z.object({
  type: z
    .string()
    .min(3, { message: "The name should be at least 3 characters " })
    .max(20),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(0.01)
    .max(100_000),
  stock: z
    .number({ invalid_type_error: "stock is required" })
    .min(0.01)
    .max(100_000),
  description: z
    .string()
    .min(10, { message: "The description should be at least 10 characters " })
    .max(100),
  specification: z
    .string()
    .min(10, { message: "The specification should be at least 10 characters " })
    .max(100),

  categoryId: z
    .array(z.string())
    .refine((value) => value.length > 0, {
      message: "Please select at least one category.",
    })
    .refine(
      (value) => {
        const numbersArray = value.map(Number);
        return numbersArray.every(Number.isInteger);
      },
      {
        message: "Invalid category IDs.",
      }
    )
    .transform((value) => value.map(Number)),

  tag: z.string().refine((value) => value !== "", {
    message: "Please select a gender.",
  }),
  reviews: z
    .string()
    .min(3, { message: "The review should be at least 3 characters " })
    .max(200),
  image: z.custom<File>((v) => !!v, {
    message: "Image is required",
  }),
});
type ProductFormData = z.infer<typeof schema>;
const Modal = ({ onCancel }: Props) => {
  const [textareaRows] = useState(8);
  const createProduct = useCreateProducts();

  const { data: categories } = useCategories();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file instanceof Blob) {
      setValue("image", file);
      convertFileToBase64(file)
        .then((base64String) => {
          console.log(base64String);
        })
        .catch((error) => {
          console.error("Error converting file to base64:", error);
        });
    }
  };
  const convertFileToBase64 = (file: File) => {
    return new Promise<string | null>((resolve, reject) => {
      if (!file || !(file instanceof Blob)) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;

        const base64Content = result.split(",")[1];
        resolve(base64Content);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const file = data.image;
      const base64Image = await convertFileToBase64(file);

      const formDataWithBase64 = { ...data, image: base64Image };

      await createProduct.mutateAsync(formDataWithBase64);
      setTimeout(() => {
        onCancel(false);
      }, 1000);
    } catch (error) {
      console.error("error", error);
    }
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
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Type:
              </label>
              <input
                {...register("type")}
                type="text"
                id="type"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Price:
              </label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                id="price"
                name="price"
                defaultValue=""
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Stock:
              </label>
              <input
                {...register("stock", { valueAsNumber: true })}
                type="number"
                id="stock"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.stock && (
                <p className="text-red-500">{errors.stock.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Description:
              </label>
              <textarea
                {...register("description")}
                name="description"
                id="description"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Specification"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Specification:
              </label>
              <textarea
                {...register("specification")}
                name="specification"
                id="specification"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
              {errors.specification && (
                <p className="text-red-500">{errors.specification.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Tag:
              </label>
              <select
                {...register("tag")}
                name="tag"
                id="tag"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring hover:border-blue-700"
              >
                <option value="" selected disabled>
                  Select an gender
                </option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
              {errors.tag && (
                <p className="text-red-500">{errors.tag.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="reviews"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Reviews:
              </label>
              <textarea
                {...register("reviews")}
                name="reviews"
                id="reviews"
                rows={textareaRows}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700s"
              ></textarea>
              {errors.reviews && (
                <p className="text-red-500">{errors.reviews.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Categories:
              </label>
              <select
                {...register("categoryId")}
                name="categoryId"
                id="categoryId"
                multiple
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring hover:border-blue-500"
              >
                <option value="" selected disabled>
                  Select an option
                </option>
                {categories?.result.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500">{errors.categoryId.message}</p>
              )}
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md"
              >
                Choose photo
                <input
                  {...register("image")}
                  className="absolute hidden"
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => onCancel(false)}
              >
                Close
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
