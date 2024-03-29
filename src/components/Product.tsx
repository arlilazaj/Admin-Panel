import useProducts from "../Producthooks/useProducts";
import ProductsTable from "./ProductsTable";

const Product = () => {
  const { data, error } = useProducts();

  if (error || !data) return null;

  return (
    <>
      <ProductsTable products={data?.result}></ProductsTable>
    </>
  );
};

export default Product;
