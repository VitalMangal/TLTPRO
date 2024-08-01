import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useAddProductMutation } from '../../../store/productsApi.js';
import { useGetManufacturersQuery } from '../../../store/manufacturersApi.js';


// Нужно стилизовать select
const getSchema = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    quantity: yup
      .number()
      .required(),
    price: yup
      .number()
      .required(),
  });
  return schema;
};

const Add = ({ closeModal }) => {

  const [addProduct, { error }] = useAddProductMutation();
  const { data: manufList = [], error: manufError } = useGetManufacturersQuery();


  const addSubmit = async (values, actions) => {
    console.log(values, 'values');
    const resp = await addProduct(values);
    console.log(resp, 'resp');
    closeModal();
    actions.resetForm();
  };

  return (
    <div id="add-modal" tabIndex="-1" 
      className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full
      before:fixed before:w-full before:h-full before:top-0 before:right-0 before:left-0 before:z-49 before:bg-slate-400 before:bg-opacity-50
      ">
        <div className="relative w-full max-w-sm max-h-full bg-slate-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-center p-5 rounded-t">
              <h3 className="text-3xl text-slate-900">
                  Создание товара
              </h3>
          </div>
          <Formik
            validationSchema={getSchema()}
            onSubmit={addSubmit}
            initialValues={{
              name: '',
              quantity: 0,
              price: 0,
              manufacturerId: 0,
              image: '',
            }}
          >
            {({
              handleSubmit, handleChange, values, touched, errors,
            }) => (
              <Form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="flex flex-col gap-4 text-md">
                  <div className="col-span-1">
                    <label htmlFor="name" className="block mb-2 text-md text-gray-900 dark:text-white">Название</label>
                    <Field onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Название" required="" />
                    {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                    <ErrorMessage name="name" />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block mb-2 text-gray-900 dark:text-white">Количество</label>
                    <Field onChange={handleChange} type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Количество" required="" />
                    {errors.quantity && touched.quantity ? (<div>{errors.quantity}</div>) : null}
                    <ErrorMessage name="quantity" />
                  </div>
                  <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                    <Field onChange={handleChange} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Цена" required="" />
                    {errors.price && touched.price ? (<div>{errors.price}</div>) : null}
                    <ErrorMessage name="price" />
                  </div>
                  <div>
                      <label htmlFor="manufacturerId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Производитель</label>
                      <select onChange={handleChange} id="manufacturerId" className="appearance-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option defaultValue>Компания</option>
                         { manufList.map(({id, name}) => <option key={id} value={id}>{name}</option>) }
                      </select>
                  </div>
                  <div>
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фото</label>
                    <div className ="w-full relative border-2 border-dotted border-gray-300 rounded-lg">
                      <label className='flex flex-col justify-center items-center p-4'>
                        <input onChange={handleChange} id='image' className="hidden" type="file" accept="image/*" />
                        <span>Загрузить фото</span>
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z" fill="#475569"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z" fill="#475569"/>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={closeModal} className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-200 inline-flex items-center bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-500">
                    Отмена
                  </button>
                  <button type="submit" className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-200 inline-flex items-center bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-500">
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

/*
<div className="bg-white w-full bg-whtie m-auto">
                      <div className="w-full file_upload p-4 relative border-4 border-dotted border-gray-300 rounded-lg">
                        <div className="input_field flex flex-col w-max mx-auto text-center">
                          <label className='flex flex-col justify-center items-center'></label>
*/