import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useAddProductMutation } from '../../../store/productsApi.ts';
import { useGetManufacturersQuery } from '../../../store/manufacturersApi.ts';
import PhotoElement from './PhotoElement.tsx';
import { AddFormValuesType, AddModalComponentType } from '../../../types';
import getFormattingData from '../../../utils/getFormattingData.ts';
import { toast } from 'react-toastify';
import GetErrorMessage from '../../../utils/getErrorMessage.ts';

const getSchema = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Это обязательное поле'),
    quantity: yup
      .number()
      .required('Это обязательное поле'),
    price: yup
      .number()
      .required('Это обязательное поле'),
  });
  return schema;
};

const Add: AddModalComponentType = ({ closeModal }) => {

  const [addProduct, { error }] = useAddProductMutation();
  const { data: manufList = [], error: manufError } = useGetManufacturersQuery();

  useEffect(() => {
    if (error) toast.error(GetErrorMessage(error));
    if (manufError) toast.error(GetErrorMessage(manufError));
  }, [error, manufError]);

  const handleSubmit = async(values: AddFormValuesType) => {

    const newData = getFormattingData(values);
    const formData = new FormData();

    const keys = Object.keys(newData) as Array<keyof typeof newData>;
    keys.forEach((key) => {
    formData.append(key, newData[key] as keyof typeof newData);
    });
    await addProduct(formData);
    toast.success('Информация о товаре успешно добавлена');
    closeModal();
  }

  const initialValues: AddFormValuesType = {
    name: '',
    quantity: 0,
    price: '',
    manufacturerId: 0,
    image: null,
  }

  return (
    <div id="add-modal" tabIndex={-1}
      className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full
      before:fixed before:w-full before:h-full before:top-0 before:right-0 before:left-0 before:z-49 before:bg-slate-400 before:bg-opacity-50
      ">
        <div className="relative w-full max-w-sm max-h-full bg-slate-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-center p-5 rounded-t">
              <h3 className="text-3xl font-medium text-slate-900">
                  Создание товара
              </h3>
          </div>
          <Formik
            validationSchema={getSchema()}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            {({
              handleSubmit, handleChange, touched, errors, setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="flex flex-col gap-4 text-md">
                  <div className="col-span-1">
                    <label htmlFor="name" className="block mb-2 text-lg text-gray-900">Название</label>
                    <Field autoFocus onChange={handleChange} type="text" name="name" id="name" className="bg-violet-200 border text-gray-900 text-md rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5" placeholder="Название" required="" />
                    {errors.name && touched.name ? (<div className='text-red-600'>{errors.name}</div>) : null}
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block mb-2 text-gray-900 dark:text-white">Количество</label>
                    <Field onChange={handleChange} type="number" name="quantity" id="quantity" className="bg-violet-200 border text-gray-900 text-md rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5" placeholder="Количество" required="" />
                    {errors.quantity && touched.quantity ? (<div className='text-red-600'>{errors.quantity}</div>) : null}
                  </div>
                  <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                    <Field onChange={handleChange} type="number" name="price" id="price" className="bg-violet-200 border text-gray-900 text-md rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5" placeholder="Цена" required="" />
                    {errors.price && touched.price ? (<div className='text-red-600'>{errors.price}</div>) : null}
                  </div>
                  <div>
                      <label htmlFor="manufacturerId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Производитель</label>
                      <select required name='manufacturerId' onChange={handleChange} id="manufacturerId" className="appearance-auto bg-violet-200 border text-gray-900 text-md rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 placeholder-gray-400">
                         { manufList.map(({id, name}) => <option key={id} value={id}>{name}</option>) }
                      </select>
                      {errors.manufacturerId && touched.manufacturerId ? (<div className='text-red-600'>{errors.manufacturerId}</div>) : null}
                  </div>
                  <div>
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900">Фото</label>
                    <PhotoElement setFieldValue={setFieldValue}/>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button type='button' onClick={closeModal} className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-200 inline-flex items-center bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-500">
                    Отмена
                  </button>
                  <button type="submit" className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-900 inline-flex items-center bg-slate-300 focus:ring-4 focus:outline-none focus:ring-neutral-500">
                    Создать
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default Add;
