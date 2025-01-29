'use client';

import { ICONS } from '@/components/designSystem';
import { useSiteLabels } from '@/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SearchBox() {
  const { siteLabels } = useSiteLabels();
  const router = useRouter();

  const [formData, setFormData] = React.useState<
    Record<string, string> | undefined
  >();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value) return;
    setFormData({ q: value });
  };

  const handleSubmit = () => {
    if (!formData) return;
    const paranms = new URLSearchParams(formData);
    const searchUrl = `/search?${paranms.toString()}`;
    router.push(searchUrl);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { code, key } = event;
    if (code.toLowerCase() === 'enter' && key.toLowerCase() === 'enter') {
      handleSubmit();
    }
  };

  return (
    <div className='flex max-w-[24rem] relative w-full'>
      <Input
        className='bg-white max-w-96 pr-20 w-screen'
        containerProps={{ className: 'min-w-0' }}
        label={siteLabels['message.searchPlaceholder']}
        name='q'
        onChange={(e) => handleQueryChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        type='text'
      />
      <Button
        className='!absolute right-1 rounded-full top-1'
        onClick={handleSubmit}
        size='sm'
      >
        <FontAwesomeIcon icon={ICONS['search']} />
      </Button>
    </div>
  );
}
