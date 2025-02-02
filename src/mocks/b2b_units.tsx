import { B2BUnit } from '@/models/commerce-types';
import {
  bauhaus as bauhausAddress,
  diycompany as diycompanyAddress,
} from './addresses';
import {
  bauhaus as bauhausCostCenter,
  diycompany as diycompanyCostCenter,
} from './cost_centers';
import {
  anna_schmidt,
  david_miller,
  emily_johnson,
  jonas_fischer,
  lukas_muller,
  sarah_anderson,
} from './users';

const bauhaus = {
  uid: '0001234',
  name: 'BAUHAUS',
  active: true,
  addresses: [bauhausAddress],
  approvers: [anna_schmidt],
  managers: [anna_schmidt],
  administrators: [jonas_fischer],
  customers: [lukas_muller],
  costCenters: [bauhausCostCenter],
};

const diycompany = {
  uid: '0005678',
  name: 'The DIY Company',
  active: true,
  addresses: [diycompanyAddress],
  approvers: [david_miller],
  managers: [david_miller],
  administrators: [sarah_anderson],
  customers: [emily_johnson],
  costCenters: [diycompanyCostCenter],
};

const MockB2BUnits: Array<B2BUnit> = [bauhaus, diycompany];

const getB2BUnit = (uid: string): B2BUnit | null => {
  if (!uid) return null;
  return MockB2BUnits.find((b2b_units) => b2b_units.uid === uid) || null;
};

const getB2bUnits = (): Array<B2BUnit> | null => {
  return MockB2BUnits;
};

export { getB2BUnit, getB2bUnits, MockB2BUnits };
