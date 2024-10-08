import { useRemoveProductMutation } from '../../../store/productsApi';
import { ConfirmModalComponentType, ConfirmRemoveModalInfoType } from '../../../types';
import { toast } from 'react-toastify';
import GetErrorMessage from '../../../utils/getErrorMessage.ts';
import { useEffect } from 'react';

const ConfirmRemove: ConfirmModalComponentType = ({ modalInfo, closeModal }) => {

  const [removeProduct, { error }] = useRemoveProductMutation();

  useEffect(() => {
    if (error) toast.error(GetErrorMessage(error));
  }, [error]);
  
  const { product } = modalInfo as ConfirmRemoveModalInfoType;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await removeProduct(product.id);
    toast.success('Информация о товаре успешно удалена');
    closeModal();
  };

  return (
    <div id="patch-modal" tabIndex={-1 }
      className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full
      before:fixed before:w-full before:h-full before:top-0 before:right-0 before:left-0 before:z-49 before:bg-slate-400 before:bg-opacity-50
      ">
        <div className="relative w-full max-w-sm max-h-full bg-slate-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-center p-5 rounded-t">
              <h3 className="text-3xl font-medium text-slate-900">
                Вы действительно хотите удалить товар?
              </h3>
          </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={closeModal} type="button" className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-200 inline-flex items-center bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-500">
                  Отмена
                </button>
                <button type="submit" className="font-medium rounded-lg text-xl px-4 py-2 text-center text-neutral-900 inline-flex items-center bg-slate-300 focus:ring-4 focus:outline-none focus:ring-neutral-500">
                  Удалить
                </button>
              </div>
          </form>
        </div>
      </div>
  );
};

export default ConfirmRemove;
