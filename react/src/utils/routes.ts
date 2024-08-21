const apiPath = 'http://localhost:3002';

export default {
  usersPath: () => apiPath,
  manufacturersPath: () => [apiPath, 'manufacturers'].join('/'),
  productsPath: () => [apiPath, 'products'].join('/'),
  
};
