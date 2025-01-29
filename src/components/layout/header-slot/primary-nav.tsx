'use client';

import { Menu } from '@/components/designSystem/';
import ICONS from '@/components/designSystem/icons';
import { useAppContext, useSiteConfig, useSiteLabels } from '@/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function PrimaryNav(props: any) {
  const { state, logout } = useAppContext();
  const { siteConfig } = useSiteConfig();
  const { siteLabels } = useSiteLabels();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname.startsWith('/dashboard');

  const [menuItems, setMenuItems] = React.useState<Array<any>>();
  // const [showLogoutModal, setShowLogoutModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const { primaryMenu } = siteConfig;
      const primaryMenuItems = primaryMenu?.map((item: any) => {
        return item.fields;
      });

      setMenuItems(primaryMenuItems);
    }

    return () => {
      isMounted = false;
    };
  }, [siteConfig]);

  const handleLogout = () => {
    logout();
    // setShowLogoutModal(true);
    router.push('/');
  };

  return (
    <>
      <div className='text-black uppercase'>
        <List className='m-0 p-0'>
          <Link href={`/${state.currentUserRoles[0]}`}>
            <ListItem
              className={`flex gap-2 items-center ${
                isActive && 'underline'
              } text-base whitespace-nowrap w-full`}
              color={isActive ? 'blue' : 'inherit'}
            >
              <ListItemPrefix>
                <FontAwesomeIcon icon={ICONS['desktop']} size='lg' />
              </ListItemPrefix>
              {siteLabels['label.dashboard']}
            </ListItem>
          </Link>
        </List>
        {menuItems && (
          <Menu menuitems={menuItems} direction='vertical' menuicons='left' />
        )}
        <List className='mb-0 mt-10 mx-0 p-0'>
          <ListItem
            className='flex gap-2 items-center text-base text-red-500 whitespace-nowrap w-full'
            onClick={handleLogout}
          >
            <ListItemPrefix>
              <FontAwesomeIcon icon={ICONS['power-off']} size='lg' />
            </ListItemPrefix>
            {siteLabels['label.signout']?.toUpperCase()}
          </ListItem>
        </List>
      </div>
      {/* {showLogoutModal && <LogoutModal />} */}
    </>
  );
}
