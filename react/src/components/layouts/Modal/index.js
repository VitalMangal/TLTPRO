import Add from './Add.jsx';
import ConfirmRemove from './ConfirmRemove.jsx';
import Patch from './Patch.jsx';
import Remove from './Remove.jsx';
import View from './View.jsx';

const modals = {
  add: Add,
  remove: Remove,
  confirmRemove: ConfirmRemove,
  patch: Patch,
  view: View,
};

export default (modalName) => modals[modalName];
