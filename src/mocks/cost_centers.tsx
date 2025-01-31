import { B2BCostCenter } from '@/models/commerce-types';
import { euro, usdollar } from './currencies';

export const bauhaus: B2BCostCenter = {
  code: '00005678',
  name: 'Kostenstelle 1',
  activeFlag: true,
  currency: euro,
  unit: undefined,
  assignedBudgets: [],
};

export const diycompany: B2BCostCenter = {
  code: '00001234',
  name: 'Cost Center 1',
  activeFlag: true,
  currency: usdollar,
  unit: undefined,
  assignedBudgets: [],
};

export const MockCostCenters: Array<B2BCostCenter> = [bauhaus, diycompany];

export const getCostCenter = (code: string): B2BCostCenter | null => {
  if (!code) return null;
  return MockCostCenters.find((cc) => cc.code === code);
};

export const getCostCenters = (): Array<B2BCostCenter> | null => {
  return MockCostCenters;
};
