'use client';

import { Icon } from '@/components/designSystem';
import useAppContext from '@/hooks/app-context';
import { MockCountries as countries } from '@/mocks';
import { Country } from '@/models/commerce-types';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

export default function LocaleSelector(props: any) {
  const { state, updateState } = useAppContext();
  const { currentLocale } = state;
  const { variant } = props;

  const [selected, setSelected] = React.useState<Country>();

  React.useEffect(() => {
    const [isocode, countrycode] = state.currentLocale.split('-');
    const country = countries.find(
      (cntry: Country) =>
        cntry.languages[0].isocode === isocode && cntry.code === countrycode
    );

    if (country) setSelected(country);
  }, [state]);

  const handleClick = (value: any) => {
    const newState = { ...state, currentLocale: value };
    updateState(newState);
  };

  return (
    <div className={`lg:w-60 w-16`}>
      <Menu placement='bottom-end'>
        <MenuHandler className='border box-border bg-inherit cursor-pointer px-2 py-1 rounded-md w-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex items-center w-full'>
              {selected?.flags?.svg && (
                <Image
                  alt={`${selected?.name} Flag Icon`}
                  className='h-5 inline-block object-cover rounded-full w-5'
                  height='0'
                  sizes='1.5rem'
                  src={selected?.flags?.svg!}
                  width='0'
                />
              )}
              <Typography
                as='span'
                className='hidden m-0 ml-2 lg:flex p-0'
                color='inherit'
              >
                {selected?.name} [{state.currentLocale}]
              </Typography>
              <Icon className='ml-auto' iconName='angle-down' prefix='fas' />
            </div>
          </div>
        </MenuHandler>
        <MenuList>
          {countries?.map(
            ({ code, flags, languages, name }: Partial<Country>) => (
              <MenuItem
                key={`${languages?.[0].isocode}-${code}`}
                onClick={() => handleClick(`${languages?.[0].isocode}-${code}`)}
                className='flex gap-2 items-center w-full'
              >
                <div className='flex items-center w-full'>
                  {flags?.svg && (
                    <Image
                      alt={`${name} Flag Icon`}
                      className='h-5 inline-block mr-2 object-cover rounded-full w-5'
                      height='0'
                      sizes='1.5rem'
                      src={flags?.svg}
                      width='0'
                    />
                  )}
                  <Typography
                    as='span'
                    className='flex m-0 p-0 text-normal whitespace-nowrap'
                  >
                    {`${name} [${languages?.[0].isocode}-${code}]`}
                  </Typography>
                </div>
              </MenuItem>
            )
          )}
        </MenuList>
      </Menu>
    </div>
  );
}
