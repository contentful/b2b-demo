'use client';

import MiniCart from '@/components/designSystem/carts/mini-cart';
import MiniProfile from '@/components/designSystem/users/mini-profile';
import { useAppContext } from '@/hooks';

export default function HeaderTools() {
  const { state } = useAppContext();
  const userRoles: string[] = state.currentUserRoles;

  return (
    <div className='flex flex-row items-center'>
      <MiniProfile />
      {!userRoles.includes('administrator') && <MiniCart />}
    </div>
  );
}
