import { useAppContext, useSiteLabels } from '@/hooks';
import { localizeDate } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';

const TICKET_EVENT_ATTRIBUTES = [
  'code',
  'author',
  'createdAt',
  'message',
  'addedByAgent',
  'toStatus',
];

export const TicketDetailsEvents = (props: any) => {
  const { details } = props;
  const { siteLabels } = useSiteLabels();

  return (
    <div className='border border-gray-300 box-border flex flex-col gap-0 h-2/3 p-2 w-full'>
      <div className='flex items-center justify-start w-full'>
        <Typography className='w-full' color='inherit' variant='h6'>
          {siteLabels['label.ticketEvents']}
        </Typography>
      </div>
      <div className='flex flex-col items-start justify-start w-full'>
        <TicketDetailsEventLabels />
        {details.ticketEvents.map((event: any) => {
          return <TicketDetailsEvent key={event.code} {...{ event }} />;
        })}
      </div>
    </div>
  );
};

const TicketDetailsEventLabels = (props: any) => {
  const { siteLabels } = useSiteLabels();

  return (
    <div className='flex items-center justify-start p-2 w-full'>
      {TICKET_EVENT_ATTRIBUTES.map((label: string, key: number) => {
        return (
          <Typography
            as='div'
            className='font-bold m-0 text-inherit text-sm text-start w-1/6'
            color='inherit'
            key={key}
          >
            {siteLabels[`label.${label}`]}
          </Typography>
        );
      })}
    </div>
  );
};

const TicketDetailsEvent = (props: any) => {
  const { event } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='border-t border-gray-300 flex items-center justify-start p-2 w-full'>
      <Typography
        as='div'
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
      >
        {event.code}
      </Typography>
      <Typography
        as='div'
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
      >
        {event.author}
      </Typography>
      <Typography
        as='div'
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
      >
        {localizeDate(state.currentLocale, event.createdAt)}
      </Typography>
      <div
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
        dangerouslySetInnerHTML={{ __html: event.message }}
      />
      <Typography
        as='div'
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
      >
        {event.addedByAgent ? 'true' : 'false'}
      </Typography>
      <Typography
        as='div'
        className='text-inherit text-sm text-start w-1/6'
        color='inherit'
      >
        {siteLabels['label.' + event.toStatus]}
      </Typography>
    </div>
  );
};
