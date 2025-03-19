'use client';

import { Menu } from '@/components/designSystem';
import { useSiteConfig } from '@/hooks';
import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function FooterNav() {
  const { siteConfig } = useSiteConfig();

  const [menuItems, setMenuItems] = React.useState<Array<any>>();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const { footerMenu1, footerMenu2, footerMenu3 } = siteConfig;
      const menus = [footerMenu1, footerMenu2, footerMenu3];

      const footerItems = menus?.map((menu) => {
        return menu?.map((item) => {
          return item.fields;
        });
      });

      setMenuItems(footerItems);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 mx-auto md:py-6 py-4 w-full'>
      {menuItems &&
        menuItems?.map((menu, key) => (
          <div className='md:text-start text-center w-full' key={key}>
            <Typography
              className='font-bold mb-5 text-base uppercase'
              color='inherit'
            >
              {menu?.[0].text}
            </Typography>
            <Menu
              menuitems={menu?.slice(1)}
              direction='vertical'
              fontSize='text-base'
            />
          </div>
        ))}
    </div>
  );
}
