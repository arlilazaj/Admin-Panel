import useCategories from "../Categoryhooks/useCategories";
import CategoryTable from "./CategoryTable";

const Category = () => {
  const { data, error } = useCategories();

  if (error || !data) return null;

  return (
    <>
      {/* <ProductsTable products={data?.result}></ProductsTable> */}
      <CategoryTable categories={data?.result} />
    </>
  );
};

export default Category;
