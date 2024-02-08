import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateCategories from "../Categoryhooks/useCreateCategories";

interface Props {
  onCancel: (cancel: boolean) => void;
}
const schema = z.object({
  type: z
    .string()
    .min(3, { message: "The name should be at least 3 characters " })
    .max(20),
});
type ProductFormData = z.infer<typeof schema>;
const CreateCategories = ({ onCancel }: Props) => {
  const createCategory = useCreateCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createCategory.mutateAsync(data);
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
        <div className="bg-white p-8 rounded-md shadow-md w-1/3  max-h-[80vh] ">
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

export default CreateCategories;
