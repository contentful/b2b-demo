'use client';

import { SearchBox } from '@/components/designSystem';
import ICONS from '@/components/designSystem/icons';
import { useAppContext, useSiteConfig, useSiteLabels } from '@/hooks';
import { User } from '@/models/commerce-types';
import { getUser } from '@/mocks/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Drawer, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import EyebrowNavigation from './eyebrow-navigation';
import HeaderTools from './header-tools';
import LocaleSelector from './locale-selector';
import PrimaryNav from './primary-nav';
import SiteLogo from './site-logo';
import SignIn from './sign-in';

export default function HeaderSlot() {
  const { state, logout } = useAppContext();
  const { currentUser: user } = state;
  const { siteConfig } = useSiteConfig();
  const { siteLabels } = useSiteLabels();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <div className='border-b border-b-gray-900 flex flex-row flex-wrap items-center justify-between mx-auto px-4 py-2 w-full'>
        <div className='flex items-center justify-between md:justify-start md:w-1/2 w-full'>
          <div className='flex items-center'>
            <div className={`h-8 mr-2 md:h-16 md:w-60 w-40`}>
              <SiteLogo />
            </div>
            <Typography
              className='font-bold hidden lg:block mx-0 mt-1 text-2xl'
              color='inherit'
            >
              {siteConfig.siteName}
            </Typography>
          </div>
          <div className='flex gap-2 items-center justify-start md:hidden visible'>
            <LocaleSelector />
            <Button
              className='aspect-square flex gap-3 items-center justify-center p-2 rounded-md text-inherit w-fit'
              onClick={openDrawer}
              size='sm'
              variant='gradient'
            >
              <FontAwesomeIcon icon={ICONS['bars']} />
            </Button>
          </div>
        </div>
        <div className='gap-2 h-full hidden items-center justify-end md:flex mt-3 w-1/2'>
          {user ? <EyebrowNavigation /> : <SignIn />}
        </div>
      </div>

      {user && (
        <>
          <div
            className={`flex flex-row flex-wrap items-center justify-between max-w-screen-xl mx-auto pb-4 pt-3 px-4 text-sm w-full`}
          >
            <div className='hidden items-center justify-start md:flex'>
              <Button
                className='flex gap-3 items-center justify-center w-fit'
                onClick={openDrawer}
                size='sm'
                variant='filled'
              >
                <FontAwesomeIcon icon={ICONS['bars']} />
                <Typography className='font-bold hidden m-0 lg:flex text-sm'>
                  {siteLabels['label.menu']}
                </Typography>
              </Button>
            </div>
            <div className='flex grow justify-center'>
              <SearchBox />
            </div>
            <div className={`hidden justify-end md:block`}>
              <HeaderTools />
              {/* <LocaleSelector /> */}
            </div>
          </div>
          <NavigationDrawer {...{ closeDrawer, handleLogout, open }} />
        </>
      )}
    </>
  );
}

const NavigationDrawer = (props: any) => {
  const { siteLabels } = useSiteLabels();
  const { closeDrawer, open } = props;
  return (
    <Drawer className='flex flex-col h-full' open={open} onClose={closeDrawer}>
      <div className='border-b flex justify-end p-2 w-full'>
        <Button
          className='flex flex-row gap-2 items-center px-2 w-max'
          onClick={closeDrawer}
          variant='text'
        >
          <Typography className='font-bold m-0 text-sm'>
            {siteLabels['label.close']}
          </Typography>
          <FontAwesomeIcon icon={ICONS['x']} />
        </Button>
      </div>
      <div className='flex flex-col gap-10 items-center justify-between ml-5 my-2 p-4'>
        <PrimaryNav />
      </div>
    </Drawer>
  );
};
