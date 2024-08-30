import { AddFormValuesType, PatchFormValuesType } from "../types";

const getFormattingData = (data: AddFormValuesType | PatchFormValuesType) => {
  const newData = {
    name: data.name,
    quantity: data.quantity,
    price: Number(data.price).toFixed(2),
    manufacturerId: Number(data.manufacturerId),
    image: data.image,
  };
  return newData;
}

export default getFormattingData;