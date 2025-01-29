import { User } from '@/models/commerce-types';
import { germany, us } from './countries';
import { euro, usdollar } from './currencies';
import { english, german } from './languages';

export const anna_schmidt: User = {
  uid: 'fb2eccd9',
  name: 'Anna Schmidt',
  firstName: 'Anna',
  lastName: 'Schmidt',
  email: 'anna.schmidt@bauhaus.de',
  currency: euro,
  language: german,
  country: germany,
  userAvatar: {
    url: '/images/anna_schmidt.jpg',
  },
  orgUnit: '0005678',
  roles: ['manager', 'approver'],
};

export const david_miller: User = {
  uid: '494fdb81',
  name: 'David Miller',
  firstName: 'David',
  lastName: 'Miller',
  email: 'dmiller@thediycompany.com',
  currency: usdollar,
  language: english,
  country: us,
  userAvatar: {
    url: '/images/david_miller.jpg',
  },
  orgUnit: '0001234',
  roles: ['manager', 'approver'],
};

export const emily_johnson: User = {
  uid: '4f2ec489',
  name: 'Emily Johnson',
  firstName: 'Emily',
  lastName: 'Johnson',
  email: 'ejohnson@thediycompany.com',
  currency: usdollar,
  language: english,
  country: us,
  userAvatar: {
    url: '/images/emily_johnson.jpg',
  },
  orgUnit: '0001234',
  roles: ['customer'],
};

export const jonas_fischer: User = {
  uid: 'ab0b9a97',
  name: 'Jonas Fischer',
  firstName: 'Jonas',
  lastName: 'Fischer',
  email: 'jonas.fischer@bauhaus.de',
  currency: euro,
  language: german,
  country: germany,
  userAvatar: {
    url: '/images/jonas_fischer.jpg',
  },
  orgUnit: '0005678',
  roles: ['administrator'],
};

export const lukas_muller: User = {
  uid: 'e0510389',
  name: 'Lukas Müller',
  firstName: 'Lukas',
  lastName: 'Müller',
  email: 'lukas.muller@bauhaus.de',
  currency: euro,
  language: german,
  country: germany,
  userAvatar: {
    url: '/images/lukas_muller.jpg',
  },
  orgUnit: '0005678',
  roles: ['customer'],
};

export const sarah_anderson: User = {
  uid: '3855fca3',
  name: 'Sarah Anderson',
  firstName: 'Sarah',
  lastName: 'Anderson',
  email: 'sanderson@thediycompany.com',
  currency: usdollar,
  language: english,
  country: us,
  userAvatar: {
    url: '/images/sarah_anderson.jpg',
  },
  orgUnit: '0001234',
  roles: ['administrator'],
};

const MockUsers: Array<User> = [
  emily_johnson,
  david_miller,
  sarah_anderson,
  lukas_muller,
  anna_schmidt,
  jonas_fischer,
];

const getUser = async (uid: string): Promise<User | undefined> => {
  if (!uid) return;

  const mockUser = MockUsers.find((user) => user.uid === uid);
  if (!mockUser) return;

  return mockUser;
};

const getUsers = async (): Promise<User[] | unknown> => {
  if (!MockUsers) return;
  return MockUsers;
};

export { getUser, getUsers, MockUsers };
