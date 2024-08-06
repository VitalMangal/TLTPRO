import { useGetManufacturersQuery } from "../../store/manufacturersApi";

const Card = ({product, manufList}) => {

  const { manufacturerId, name, photoUrl, price, quantity } = product;

	return (
    <div className="grid grid-cols-2 grid-rows-22 w-full h-full p-2.5 rounded-lg bg-slate-200">
      <div className="col-span-2 rounded-lg h-min">
        <img src={photoUrl} alt="" className="object-cover w-56 h-56 rounded-lg"/>
      </div>
      <div className="col-span-2 row-span-1 text-center text-2xl">
        {name}
      </div>
      <div className="col-span-2 row-span-1 text-center text-lg truncate">
        {manufList.find((item) => item.id === manufacturerId).name}
      </div>
      <div className="col-span-1 row-span-1 text-start">
        {quantity} шт
      </div>
      <div className="col-span-1 row-span-1 text-end">
        {price} р
      </div>
    </div>
  )
};

const ProductsFormGrid = ({productsList, openModal}) => {
  const { data: manufList = [], error: manufError } = useGetManufacturersQuery();
	return (
    <div className="grid grid-cols-4 grid-rows-2 w-full h-full gap-2.5">
			{productsList.map(product => {
            if(!product) null;
            return(
              <Card 
                key={product.id}
                product={product}
                manufList={manufList}
              />
            )
          })}
    </div>

  )
};

export default ProductsFormGrid;
