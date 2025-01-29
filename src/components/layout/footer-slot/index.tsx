'use client';

import useAppContext from '@/hooks/app-context';
import Copyright from './copyright';
import FooterNav from './footer-nav';
import SocialNav from './social-nav';

export default function FooterSlot() {
  const { state } = useAppContext();
  const { currentUser } = state;

  return (
    <>
      {currentUser !== '' && (
        <div className='bg-inherit flex flex-col max-w-screen-xl mx-auto px-4 text-inherit w-full'>
          <FooterNav />
        </div>
      )}
      <div className='bg-gray-700 border-t flex flex-col gap-6 h-auto md:h-24 items-center justify-center md:flex-row md:justify-between mx-auto px-8 py-4 text-white w-full'>
        <Copyright />
        <SocialNav />
      </div>
    </>
  );
}
