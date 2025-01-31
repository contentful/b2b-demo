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
        className='h-full object-contain w-full'
        src={source}
        alt='Site logo'
        height='64'
        width='240'
      />
    </Link>
  );
}
