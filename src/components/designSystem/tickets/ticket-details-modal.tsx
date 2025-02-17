import { useSiteLabels } from '@/hooks';
import { getTicket } from '@/mocks';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { TicketDetailsEvents } from './ticket-details-events';
import { TicketDetailsHeader } from './ticket-details-header';

export default function OrderDetailsModal(props: any) {
  const { code } = props;
  const { siteLabels } = useSiteLabels();

  const [details, setDetails] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    let isMounted = true;

    const getTicketDetails = async () => {
      const ticketDetails = await getTicket(code);
      if (!ticketDetails) return;
      if (isMounted) {
        setDetails(ticketDetails);
      }
    };

    getTicketDetails();
    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className='flex flex-col gap-0 h-fit max-h-96 overflow-y-auto w-full'>
      {error && <div>{error}</div>}

      {details && (
        <>
          <div className='flex flex-col gap-2 h-1/3 w-full'>
            <div className='bg-gray-200 flex gap-3 items-center justify-start p-2 w-full'>
              <Typography
                className='font-bold m-0 w-fit'
                color='inherit'
                variant='h6'
              >
                {siteLabels['label.subject']}:
              </Typography>
              <Typography
                as='span'
                className='m-0 text-base w-fit'
                color='inherit'
              >
                {details.subject}
              </Typography>
            </div>
            <TicketDetailsHeader {...{ details }} />
            {details.ticketEvents && <TicketDetailsEvents {...{ details }} />}
          </div>
        </>
      )}
    </div>
  );
}
