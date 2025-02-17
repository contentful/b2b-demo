import { useAppContext, useSiteLabels } from '@/hooks';
import { localizeDate } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';

export const TicketDetailsHeader = (props: any) => {
  const { details } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='border border-gray-300 box-border flex gap-0 items-start justify-start'>
      <div className='flex flex-col gap-2 p-2 w-1/4'>
        <Typography variant='h6'>{siteLabels['label.ticketNumber']}</Typography>
        <Typography className='' color='inherit' variant='small'>
          {details.id}
        </Typography>
      </div>
      <div className='border-l border-gray-300 flex flex-col gap-2 p-2 w-1/4'>
        <Typography variant='h6'>{siteLabels['label.creationTime']}</Typography>
        <Typography className='' color='inherit' variant='small'>
          {localizeDate(state.currentLocale, details.createdAt)}
        </Typography>
      </div>
      <div className='border-l border-gray-300 flex flex-col gap-2 p-2 w-1/4'>
        <Typography variant='h6'>{siteLabels['label.updateTime']}</Typography>
        <Typography className='' color='inherit' variant='small'>
          {localizeDate(state.currentLocale, details.modifiedAt)}
        </Typography>
      </div>
      <div className='border-l border-gray-300 flex flex-col gap-2 p-2 w-1/4'>
        <Typography variant='h6'>{siteLabels['label.status']}</Typography>
        <Typography className='' color='inherit' variant='small'>
          {details.status}
        </Typography>
      </div>
    </div>
  );
};
