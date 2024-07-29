import { useGetProductsQuery } from "../../store/productsApi";
import { useEffect } from "react";

const ProductsForm = () => {
  const { data = [], error } = useGetProductsQuery();

  useEffect(() => {
console.log(data, 'products');
  }, [data]);

	return (
    <>
      <p> Products!!</p>
      <ul>
        {data.map(item => {
          const { id, manufacturerId, name, photoUrl, price, quantity } = item;
          return(
            <li className="w-full flex flex-row justify-around grow">
              <div>{manufacturerId}</div>
              <div>{name}</div>
              <div>{photoUrl}</div>
              <div>{price}</div>
              <div>{quantity}</div>
            </li>
          )
        })}
      </ul>
    </>

  )
};

export default ProductsForm;