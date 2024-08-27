import { ProductType } from "./Product";

export type TypeOfModal = 'add' | 'remove' | 'confirmRemove' | 'patch' | 'view';

//Нужно убрать дублирование

export type AddModalInfoType = {
	type: 'add',
	product: null,
};

export type RemoveModalInfoType = {
	type: 'remove',
	product: ProductType,
};

export type ConfirmRemoveModalInfoType = {
	type: 'confirmRemove',
	product: ProductType,
};

export type PatchModalInfoType = {
	type: 'patch',
	product: ProductType,
};

export type ViewModalInfoType = {
	type: 'view',
	product: ProductType,
};

export type NullModalInfoType = {
	type: null,
	product: null,
};

export type ModalInfoType = 
  AddModalInfoType
  | RemoveModalInfoType
  | ConfirmRemoveModalInfoType
  | PatchModalInfoType
  | ViewModalInfoType
  | NullModalInfoType

export type OpenModalType = (props: ModalInfoType) => void;

export type CloseModalType = () => void;

export type RenderModalType = (
	modalInfo: ModalInfoType,
	openModal: OpenModalType,
	closeModal: CloseModalType,
) => JSX.Element | null;

//Нужно убрать дублирование
export type AddModalComponentType = ({ closeModal } :
  { closeModal: CloseModalType }) => JSX.Element;

export type RemoveModalComponentType = ({ closeModal, modalInfo, openModal } : 
  { closeModal: CloseModalType, 	modalInfo: ModalInfoType, openModal: OpenModalType }) => JSX.Element;

export type ConfirmModalComponentType = ({ closeModal, modalInfo } : 
  { closeModal: CloseModalType, 	modalInfo: ModalInfoType }) => JSX.Element;

export type PatchModalComponentType = ({ closeModal, modalInfo } : 
  { closeModal: CloseModalType, 	modalInfo: ModalInfoType }) => JSX.Element;

export type ViewModalComponentType = ({ closeModal, modalInfo } : 
  { closeModal: CloseModalType, 	modalInfo: ModalInfoType }) => JSX.Element;

export type ModalsType = {
  add: AddModalComponentType,
  remove: RemoveModalComponentType,
  confirmRemove: ConfirmModalComponentType,
  patch: PatchModalComponentType,
  view: ViewModalComponentType,
}

export type GenerateModalsType = 
  AddModalComponentType
  | RemoveModalComponentType
  | ConfirmModalComponentType
  | PatchModalComponentType
  | ViewModalComponentType;

export type GetModelType = (modalName: TypeOfModal) => GenerateModalsType;