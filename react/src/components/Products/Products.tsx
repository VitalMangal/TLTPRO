import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import cn from 'classnames';
import { useGetProductsQuery } from "../../store/productsApi.js";

import Sidebar from '../layouts/sidebar.js';
import ProductsFormGrid from './ProductsFormGrid.js';
import ProductsFormFlex from './ProductsFormFlex.js';

import getModal from '../layouts/Modal/index.js';
import { ModalInfoType, OpenModalType, RenderModalType } from "../../types";

const renderModal: RenderModalType = (modalInfo, openModal, closeModal) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return (
    <Component
      modalInfo={modalInfo}
			openModal={openModal}
      closeModal={closeModal}
    />
  );
};
const defaultPage = 1;


//нужна тень на поисковой строке(мб при фокусе на ней)
const Products = () => {
	
	const [modalInfo, setModalInfo] = useState<ModalInfoType>({ type: null, product: null });
	const [searchString, setSearchString] = useState('');
	const [activePage, setActivePage] = useState(defaultPage);
	const [pagesCount, setPagesCount] = useState(13);
	const [productsForm, setProductsForm] = useState<'Flex' | 'Grid'>('Flex');

	const { data:productsList = [], error: productError, isSuccess } = useGetProductsQuery({limit: 8, page: activePage, q: searchString});
	// Не знаю как получить количество товаров по запросу, тут костыль
	const { data:fullProductsList = [], error: fullProductsListError, isSuccess: fullIsSuccess} = useGetProductsQuery({limit: 10000, page: 1, q: searchString});

  useEffect(() => {
				console.log(productsList, 'productsList');
				console.log(fullProductsList, 'fullProductsList');
				if(fullProductsList.length === 0) {
					setPagesCount(1);
				}
				setPagesCount(Math.ceil(fullProductsList.length / 8));
				console.log(pagesCount, 'pagesCount');
  }, [productsList, fullProductsList]);

		const flexButtonClasses = cn('flex', 'items-center', 'justify-center', 'w-[50px]', 'h-full', 'rounded-l-lg', {
			'bg-slate-400': productsForm === 'Flex',
			'bg-slate-300': productsForm === 'Grid',
		});
		const gridButtonClasses = cn('flex', 'items-center', 'justify-center', 'w-[50px]', 'h-full', 'rounded-r-lg', {
			'bg-slate-400': productsForm === 'Grid',
			'bg-slate-300': productsForm === 'Flex',
		});

  const openModal: OpenModalType = ({type, product}) => {
		setModalInfo({ type, product } as ModalInfoType);
	};

  const closeModal = () => setModalInfo({ type: null, product: null });

	return (
		<>
			<div className='flex'>
				<Sidebar />
				<div className="w-full flex justify-center">
					<div className="container flex flex-col flex-initial justify-start max-w-5xl mt-16 mb-24">
						<div className="inputs-container h-14 flex flex-row justify-between">
							<input type="text" onChange={(e) => setSearchString(e.target.value)} value={searchString} className='w-60 h-7 bg-gray-200 rounded-lg' placeholder='  Поиск'/>
							<div className="flex flex-row justify-between gap-x-2.5">
								<div className="flex flex-row w-[100px] h-10">
									<button onClick={() => setProductsForm('Flex')} className={flexButtonClasses}>
										<svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M0.8125 1.25C0.8125 0.62868 1.31618 0.125 1.9375 0.125C2.55882 0.125 3.0625 0.62868 3.0625 1.25C3.0625 1.87132 2.55882 2.375 1.9375 2.375C1.31618 2.375 0.8125 1.87132 0.8125 1.25ZM5.6875 1.25C5.6875 0.835786 6.02329 0.5 6.4375 0.5H18.4375C18.8517 0.5 19.1875 0.835786 19.1875 1.25C19.1875 1.66421 18.8517 2 18.4375 2H6.4375C6.02329 2 5.6875 1.66421 5.6875 1.25ZM0.8125 6.5C0.8125 5.87868 1.31618 5.375 1.9375 5.375C2.55882 5.375 3.0625 5.87868 3.0625 6.5C3.0625 7.12132 2.55882 7.625 1.9375 7.625C1.31618 7.625 0.8125 7.12132 0.8125 6.5ZM5.6875 6.5C5.6875 6.08579 6.02329 5.75 6.4375 5.75H18.4375C18.8517 5.75 19.1875 6.08579 19.1875 6.5C19.1875 6.91421 18.8517 7.25 18.4375 7.25H6.4375C6.02329 7.25 5.6875 6.91421 5.6875 6.5ZM0.8125 11.75C0.8125 11.1287 1.31618 10.625 1.9375 10.625C2.55882 10.625 3.0625 11.1287 3.0625 11.75C3.0625 12.3713 2.55882 12.875 1.9375 12.875C1.31618 12.875 0.8125 12.3713 0.8125 11.75ZM5.6875 11.75C5.6875 11.3358 6.02329 11 6.4375 11H18.4375C18.8517 11 19.1875 11.3358 19.1875 11.75C19.1875 12.1642 18.8517 12.5 18.4375 12.5H6.4375C6.02329 12.5 5.6875 12.1642 5.6875 11.75Z" fill="#1E293B"/>
										</svg>
									</button>
									<button onClick={() => setProductsForm('Grid')} className={gridButtonClasses}>
										<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M0 3.5C0 1.84315 1.34315 0.5 3 0.5H5.25C6.90685 0.5 8.25 1.84315 8.25 3.5V5.75C8.25 7.40685 6.90685 8.75 5.25 8.75H3C1.34315 8.75 0 7.40685 0 5.75V3.5ZM9.75 3.5C9.75 1.84315 11.0931 0.5 12.75 0.5H15C16.6569 0.5 18 1.84315 18 3.5V5.75C18 7.40685 16.6569 8.75 15 8.75H12.75C11.0931 8.75 9.75 7.40685 9.75 5.75V3.5ZM0 13.25C0 11.5931 1.34315 10.25 3 10.25H5.25C6.90685 10.25 8.25 11.5931 8.25 13.25V15.5C8.25 17.1569 6.90685 18.5 5.25 18.5H3C1.34315 18.5 0 17.1569 0 15.5V13.25ZM9.75 13.25C9.75 11.5931 11.0931 10.25 12.75 10.25H15C16.6569 10.25 18 11.5931 18 13.25V15.5C18 17.1569 16.6569 18.5 15 18.5H12.75C11.0931 18.5 9.75 17.1569 9.75 15.5V13.25Z" fill="#1E293B"/>
										</svg>
									</button>
								</div>
								<button onClick={() => openModal({type: 'add', product: null})} className='w-32 h-10 bg-slate-300 rounded-lg text-lg'>
									Добавить
								</button>
							</div>
						</div>
						{productsForm === 'Flex'
						? <ProductsFormFlex productsList={productsList} openModal={openModal}/>
						: <ProductsFormGrid productsList={productsList}/>
					 }
							<Pagination
								className="flex justify-center mt-auto"
								onChange={(event, page) => setActivePage(page)}
								count={pagesCount}
								shape="rounded"
								siblingCount={2}
								defaultPage={defaultPage}
							/>
					</div>				
				</div>
			</div>
			{renderModal(modalInfo, openModal, closeModal)}
		</>
	);
};

export default Products;
