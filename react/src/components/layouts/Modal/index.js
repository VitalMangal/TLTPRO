import Add from './Add.jsx';
//import Remove from './Remove.jsx';
//import Rename from './Rename.jsx';

const modals = {
  add: Add,
  //remove: Remove,
  //patch: Patch,
};

export default (modalName) => modals[modalName];
