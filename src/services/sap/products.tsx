'use server';

import SAPClient from './sap-client';

const getProduct = async ({ code, locale }: any): Promise<any> => {
  if (!code)
    throw new Error(
      'Invalid number of arguments provided for the getProduct call'
    );

  const client = new SAPClient();
  const params = { fields: 'FULL', locale };
  const endpoint = `products/${code}`;

  return await client
    .get(endpoint, params)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const getProducts = async (
  queryParams?: Record<string, string>
): Promise<any> => {
  const client = new SAPClient();
  let params = {
    fields: 'FULL',
  };
  if (queryParams) {
    params = { ...params, ...queryParams };
  }

  return await client
    .get('products/search', params)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export { getProduct, getProducts };
