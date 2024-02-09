import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Users } from "../entities/User";
import useUpdateUsers from "../UserHooks/useUpdateUsers";

interface Props {
  onCancel: (cancel: boolean) => void;
  selectedUser: Users;
}
const schema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "The name should be at least 3 characters " })
    .max(20),
  userName: z
    .string()
    .min(3, { message: "The name should be at least 3 characters " })
    .max(20),
  email: z.string().email({ message: "Invalid email address" }),

  //   password: z
  //     .string()
  //     .min(8, { message: "Password must be at least 8 characters long" })
  //     .regex(/[a-z]/, {
  //       message: "Password must contain at least one lowercase letter",
  //     })
  //     .regex(/[A-Z]/, {
  //       message: "Password must contain at least one uppercase letter",
  //     })
  //     .regex(/[0-9]/, { message: "Password must contain at least one number" })
  //     .regex(/[^a-zA-Z0-9]/, {
  //       message: "Password must contain at least one non-letter character",
  //     }),
});
type ProductFormData = z.infer<typeof schema>;
const EditUser = ({ onCancel, selectedUser }: Props) => {
  const updateUser = useUpdateUsers(selectedUser.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const dataToPost = { ...data, id: selectedUser.id };
      console.log(dataToPost);

      await updateUser.mutateAsync(dataToPost);
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
          <h2 className="text-2xl font-semibold mb-4">Update User</h2>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Name:
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                defaultValue={selectedUser.name}
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Username:
              </label>
              <input
                {...register("userName")}
                type="text"
                defaultValue={selectedUser.userName}
                id="userName"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email:
              </label>
              <input
                {...register("email")}
                type="text"
                defaultValue={selectedUser.email}
                id="email"
                className="form-input border-2 hover:border-blue-500 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-700"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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

export default EditUser;
