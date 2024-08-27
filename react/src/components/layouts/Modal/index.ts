import { GetModelType, ModalsType } from '../../../types';
import Add from './Add.js';
import ConfirmRemove from './ConfirmRemove.js';
import Patch from './Patch.js';
import Remove from './Remove.js';
import View from './View.js';

const modals: ModalsType = {
  add: Add,
  remove: Remove,
  confirmRemove: ConfirmRemove,
  patch: Patch,
  view: View,
};

const getModel: GetModelType = (modalName) => modals[modalName];

export default getModel;

