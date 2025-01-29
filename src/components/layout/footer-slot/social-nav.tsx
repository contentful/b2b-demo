'use client';

import Menu from '@/components/designSystem/navigation/menu';
import { useSiteConfig } from '@/hooks';
import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function SocialNav(props: any) {
  const preview = props.isInExpEditorMode;
  const { siteConfig } = useSiteConfig();

  const [menuItems, setMenuItems] = React.useState<Array<any>>();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const socialItems = siteConfig.socialMenu?.map((item) => {
        return item.fields;
      });

      setMenuItems(socialItems);
    }

    return () => {
      isMounted = false;
    };
  }, [siteConfig]);

  return (
    <div className='flex flex-wrap gap-4 justify-center md:order-2 order-1 text-white sm:justify-center'>
      {menuItems ? (
        <Menu menuitems={menuItems} menuicons='only' iconsize='h-6 w-6' />
      ) : (
        preview && (
          <Typography className='font-normal text-base'>
            social menu not loaded
          </Typography>
        )
      )}
    </div>
  );
}
