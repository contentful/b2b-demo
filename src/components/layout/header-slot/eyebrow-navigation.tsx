'use client';

import { Menu, QuickOrderModal } from '@/components/designSystem';
import { useSiteConfig } from '@/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function EyebrowNavigation(props: any) {
  const { siteConfig } = useSiteConfig();
  const router = useRouter();

  const [menuItems, setMenuItems] = React.useState<Array<any>>();
  const [showQuickOrder, setShowQuickOrder] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const { eyebrowMenu } = siteConfig;
    const eyebrowItems = eyebrowMenu?.map((item: any) => {
      return item.fields;
    });

    if (isMounted) {
      setMenuItems(eyebrowItems);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLinkClick = (url: string) => {
    if (url === 'quick-order') {
      toggleModal();
    } else {
      router.push(url);
    }
  };

  const toggleModal = () => {
    setShowQuickOrder(!showQuickOrder);
  };

  return (
    <>
      <div className='flex gap-2 font-bold uppercase'>
        <Menu
          menuitems={menuItems}
          fontSize='text-sm'
          handleLinkClick={handleLinkClick}
        />
      </div>
      <QuickOrderModal {...{ showQuickOrder, toggleModal }} />
    </>
  );
}
