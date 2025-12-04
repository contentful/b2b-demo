import { Address } from '@/models/commerce-types';

export const bauhaus: Address = {
  id: '0005678',
  street1: 'Hasenheide 109',
  city: 'Berlin',
  countryCode: 'DE',
  postalcode: '10967',
  defaultAddress: true,
  shippingAddress: true,
  visible: true,
};

export const diycompany: Address = {
  id: '0001234',
  street1: '2709 Woodburn Ave',
  city: 'Cincinatti',
  stateOrProvince: 'OH',
  countryCode: 'US',
  postalcode: '45202',
  defaultAddress: true,
  shippingAddress: true,
  visible: true,
};

export const MockAddresses: Array<Address> = [bauhaus, diycompany];

export const getAddress = (id: string): Address | null => {
  if (!id) return null;
  return MockAddresses.find((address) => address.id === id) || null;
};

export const getAddresses = (): Array<Address> | null => {
  return MockAddresses;
};
