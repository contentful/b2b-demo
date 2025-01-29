'use client';

import { Menu } from '@/components/designSystem';
import { useSiteConfig } from '@/hooks';
import React from 'react';

export default function EyebrowNavigation(props: any) {
  const { siteConfig } = useSiteConfig();

  const [menuItems, setMenuItems] = React.useState<Array<any>>();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const { eyebrowMenu } = siteConfig;
      const eyebrowItems = eyebrowMenu?.map((item: any) => {
        return item.fields;
      });

      setMenuItems(eyebrowItems);
    }
    return () => {
      isMounted = false;
    };
  }, [siteConfig]);

  return (
    <div className='font-bold uppercase'>
      <Menu menuitems={menuItems} fontSize='text-sm' />
    </div>
  );
}
