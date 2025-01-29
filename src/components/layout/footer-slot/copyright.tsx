'use client';

import { useSiteConfig } from '@/hooks';
import { Typography } from '@material-tailwind/react';

export default function Copyright() {
  const { siteConfig } = useSiteConfig();

  return (
    <Typography className='font-bold md:order-1 m-0 order-6 text-inherit text-normal'>
      {siteConfig.copyright}
    </Typography>
  );
}
