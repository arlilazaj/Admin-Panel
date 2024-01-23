import useProducts from "../hooks/useProducts";
import ProductsTable from "./ProductsTable";

const Product = () => {
  const { data, error } = useProducts();

  if (error || !data) return null;

  return (
    <>  
      <ProductsTable
        products={data?.result}
        onDelete={(id) => data.result.filter((product) => product.id !== id)}
      ></ProductsTable>
    </>
  );
};

export default Product;
