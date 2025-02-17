import { useAppContext, useSiteLabels } from '@/hooks';
import { localizeDate } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';

export const QuoteDetailsStatus = (props: any) => {
  const { details } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='bg-gray-200 flex items-center justify-between gap-2 px-4 py-2 w-full'>
      <div className='flex gap-2 items-baseline justify-start w-fit'>
        <Typography className='m-0 npy-1 w-fit' color='inherit' variant='h6'>
          {siteLabels[`label.${details.status}`]}
        </Typography>
        <Typography className='m-0 py-1 w-fit' color='inherit' variant='small'>
          {localizeDate(state.currentLocale, details.updateTime)}
        </Typography>
      </div>
      {details.status === 'shipped' && (
        <Typography
          className='border font-bold hover:bg-black hover:cursor-pointer hover:shadow-lg hover:text-white m-0 px-3 py-1 rounded-full w-fit'
          color='black'
          variant='small'
        >
          {siteLabels['label.trackDelivery']}
        </Typography>
      )}
    </div>
  );
};
