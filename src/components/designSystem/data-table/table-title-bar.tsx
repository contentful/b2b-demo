import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Typography } from '@material-tailwind/react';
import StatusSelect from './status-select';

export default function TableTitleBar(props: any) {
  const {
    bgcolor,
    datatype,
    filter,
    handleOptionClick,
    preview,
    setSortOpen,
    siteLabels,
    sortOpen,
    sortOptions,
    textcolor,
  } = props;
  return (
    <>
      {preview ? (
        <div
          className={`${bgcolor} font-bold py-1 rounded-t-lg text-center ${textcolor} text-normal text-sm uppercase'`}
        >
          {datatype} data table - data is dynamically loaded based on the signed
          in user
        </div>
      ) : (
        <div
          className={`${bgcolor} flex items-center justify-between px-2 py-1 ${textcolor} w-full`}
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
