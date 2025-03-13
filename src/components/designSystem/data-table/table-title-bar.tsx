import { Typography } from '@material-tailwind/react';
import StatusSelect from './status-select';
import {
  TailwindBgColorsMap,
  TailwindTextColorsMap,
} from '@/utils/tailwind-colors-utils';

export default function TableTitleBar(props: any) {
  const {
    datatype,
    filter,
    handleOptionClick,
    editMode,
    setSortOpen,
    siteLabels,
    sortOpen,
    sortOptions,
    titlebg,
    titletext,
  } = props;

  const bgcolor = !['black', 'white', 'inherit'].includes(titlebg)
    ? titlebg + '-500'
    : titlebg;

  const textcolor = !['black', 'white', 'inherit'].includes(titletext)
    ? titletext + '-500'
    : titletext;

  return (
    <>
      {editMode ? (
        <div
          className={`${TailwindBgColorsMap[bgcolor]} font-bold py-1 rounded-t-lg text-center ${TailwindTextColorsMap[textcolor]} text-normal text-sm uppercase'`}
        >
          {datatype} data table - data is dynamically loaded based on the signed
          in user
        </div>
      ) : (
        <div
          className={`${TailwindBgColorsMap[bgcolor]} flex items-center justify-between p-2 rounded-t-lg ${TailwindTextColorsMap[textcolor]} w-full`}
        >
          <Typography
            className=' m-0 px-4 py-0 w-fit'
            color='inherit'
            variant='h5'
          >
            {siteLabels[`label.${datatype}`]}
          </Typography>
          <StatusSelect
            {...{
              filter,
              handleOptionClick,
              setSortOpen,
              siteLabels,
              sortOpen,
              sortOptions,
            }}
          />
        </div>
      )}
    </>
  );
}
