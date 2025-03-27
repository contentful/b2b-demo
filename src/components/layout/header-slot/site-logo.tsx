'use client';

import { useSiteConfig } from '@/hooks';
import { getContentfulImageUrl } from '@/utils/image-utils';
import Image from 'next/image';
import Link from 'next/link';

export default function SiteLogo() {
  const { siteConfig } = useSiteConfig();
  const { siteLogo } = siteConfig;
  const source =
    (siteLogo && getContentfulImageUrl(siteLogo)) ||
    '/images/powertoolz-logo-white.png';

  return (
    <Link href='/'>
      <Image
        alt='Site logo'
        className='h-full object-contain w-full'
        height='0'
        sizes='20rem'
        src={source}
        width='0'
      />
    </Link>
  );
}
