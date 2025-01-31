import { DeliveryMode } from '@/models/commerce-types';

export const fedex_standard: DeliveryMode = {
  code: 'fedex-standard',
  name: 'FedEx Standard',
  deliveryCost: { value: 0.125 },
};

export const fedex_priority: DeliveryMode = {
  code: 'fedex-priority',
  name: 'FedEx Priority',
  deliveryCost: { value: 0.2 },
};

export const dhl_standard: DeliveryMode = {
  code: 'dhl-standard',
  name: 'DHL Standard',
  deliveryCost: { value: 0.1 },
};

export const dhl_priority: DeliveryMode = {
  code: 'dhl-priority',
  name: 'DHL Priority',
  deliveryCost: { value: 0.175 },
};

export const ups_standard: DeliveryMode = {
  code: 'ups-standard',
  name: 'UPS Standard',
  deliveryCost: { value: 0.125 },
};

export const ups_priority: DeliveryMode = {
  code: 'ups-standard',
  name: 'UPS Standard',
  deliveryCost: { value: 0.2 },
};

export const MockDeliveryModes: Array<DeliveryMode> = [
  dhl_priority,
  dhl_standard,
  fedex_priority,
  fedex_standard,
  ups_priority,
  ups_standard,
];

export const getDeliveryMode = (code: string): DeliveryMode | null => {
  if (!code) return null;
  return MockDeliveryModes.find((mode) => mode.code === code);
};

export const getDeliveryModes = (): Array<DeliveryMode> | null => {
  return MockDeliveryModes;
};
