'use client';

import ICONS from '@/components/designSystem/icons';
import useAppContext from '@/hooks/app-context';
import { countries } from '@/mocks/countries';
import { Country } from '@/models/commerce-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
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
              <img
                alt={selected?.name}
                className='h-5 inline-block object-cover rounded-full w-5'
                src={selected?.flags?.svg}
              />
              <Typography
                as='span'
                className='hidden m-0 ml-2 lg:flex p-0'
                color='inherit'
              >
                {selected?.name} [{state.currentLocale}]
              </Typography>
              <FontAwesomeIcon className='ml-auto' icon={ICONS['angle-down']} />
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
                  <img
                    src={flags?.svg}
                    alt={name}
                    className='h-5 inline-block mr-2 object-cover rounded-full w-5'
                  />
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
