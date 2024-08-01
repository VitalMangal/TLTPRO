export default (manufList, id) => {
  const currManuf = manufList.find((item) => item.id === id);
  return currManuf.name;
}