'use client';

import { useSiteConfig } from '@/hooks';
import { getContentfulImageUrl } from '@/utils/image-utils';
import Link from 'next/link';

export default function SiteLogo() {
  const { siteConfig } = useSiteConfig();
  const { siteLogo } = siteConfig;
  const source = siteLogo
    ? getContentfulImageUrl(siteLogo)
    : '/images/powertoolz-logo-white.png';

  return (
    <Link href='/'>
      <img
        className='h-full object-contain w-full'
        src={source}
        alt='Site logo'
      />
    </Link>
  );
}
