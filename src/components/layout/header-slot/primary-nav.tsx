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
  const { closeDrawer } = props;
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
    handleLinkClick('/');
  };

  const handleLinkClick = (href: string) => {
    if (href) router.push(href);
    closeDrawer();
  };

  return (
    <>
      <div className='text-black uppercase'>
        <List className='m-0 p-0'>
          <ListItem
            className={`flex gap-2 items-center ${
              isActive && 'underline'
            } text-base whitespace-nowrap w-full`}
            color={isActive ? 'blue' : 'inherit'}
            onClick={() => handleLinkClick(state.currentUserRoles[0])}
          >
            <ListItemPrefix>
              <FontAwesomeIcon icon={ICONS['desktop']} size='lg' />
            </ListItemPrefix>
            {siteLabels['label.dashboard']}
          </ListItem>
        </List>
        {menuItems && (
          <Menu
            menuitems={menuItems}
            direction='vertical'
            menuicons='left'
            {...{ handleLinkClick }}
          />
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
