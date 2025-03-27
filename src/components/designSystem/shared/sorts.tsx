'use client';

import { useSiteLabels } from '@/hooks';
import { Option, Select, Typography } from '@material-tailwind/react';

export default function Sorts(props: any) {
  const { siteLabels } = useSiteLabels();
  const { handleChangeSort, sortOptions } = props;

  const getSelectedOption = () => {
    const selectedOption = sortOptions.find((option: any) => option.selected);
    return selectedOption.value;
  };

  return (
    <div className='flex h-12 items-center lg:mr-auto mr-0 px-2 w-full'>
      {sortOptions && (
        <>
          <Typography
            as='span'
            className='font-normal mr-2 mt-1 whitespace-nowrap'
          >
            {siteLabels['label.sort']}
          </Typography>
          <Select
            className='box-border border-gray-800 h-12 py-3 min-w-56 w-full'
            labelProps={{
              className: 'after:content-none before:content-none',
            }}
            name='sort'
            onChange={(value) => handleChangeSort(value)}
            size='lg'
            value={getSelectedOption()}
            variant='outlined'
          >
            {sortOptions?.map((opt: any, key: number) => {
              return (
                <Option key={key} value={opt.value}>
                  {opt.displayName}
                </Option>
              );
            })}
          </Select>
        </>
      )}
    </div>
  );
}
