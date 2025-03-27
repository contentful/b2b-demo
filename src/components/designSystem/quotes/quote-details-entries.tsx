import { useAppContext, useSiteLabels } from '@/hooks';
import { OrderEntry } from '@/models/commerce-types';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

export const QuoteDetailsEntries = (props: any) => {
  const { details } = props;
  const { status } = details;

  return (
    <div className='flex flex-col gap-2 h-1/3 w-full'>
      <QuoteDetailsEntriesLabels />
      <div className='flex flex-col gap-2 h-1/3 w-full'>
        {details.entries.map((entry: OrderEntry) => {
          return (
            <QuoteDetailsEntry key={entry.entryNumber} {...{ entry, status }} />
          );
        })}
      </div>
    </div>
  );
};

const QuoteDetailsEntriesLabels = () => {
  const { siteLabels } = useSiteLabels();

  return (
    <div className='flex items-center justify-start px-4 py-2 w-full'>
      <Typography
        as='div'
        className='font-bold text-inherit text-sm text-start w-5/12'
      >
        {siteLabels['label.description']?.toUpperCase()}
      </Typography>
      <Typography
        as='div'
        className='font-bold text-inherit text-sm text-center w-2/12'
      >
        {siteLabels['label.quantity']?.toUpperCase()}
      </Typography>
      <Typography
        as='div'
        className='font-bold text-inherit text-sm text-center w-2/12'
      >
        {siteLabels['label.total']?.toUpperCase()}
      </Typography>
      <Typography
        as='div'
        className='font-bold text-inherit text-sm text-center w-3/12'
      >
        {siteLabels['label.actions']?.toUpperCase()}
      </Typography>
    </div>
  );
};

const QuoteDetailsEntry = (props: any) => {
  const { entry, status } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='border-t border-gray-300 flex items-center justify-start px-4 py-2 w-full'>
      <div className='flex gap-3 items-center justify-start w-5/12'>
        <div className='h-full w-1/6'>
          <Image
            alt={entry.product.name}
            className='h-full object-cover w-full'
            height='0'
            sizes='10rem'
            src={getSAPProductImageUrl(entry.product)!}
            width='0'
          />
        </div>
        <div className='flex flex-col h-full w-5/6'>
          <div
            className='font-bold m-0 text-inherit text-sm'
            dangerouslySetInnerHTML={{ __html: entry.product.name }}
          />
          <Typography
            className='m-0 text-inherit'
            color='inherit'
            variant='small'
          >
            {entry.product.code}
          </Typography>
          <Typography
            className='m-0 text-inherit'
            color='inherit'
            variant='small'
          >
            {localizeCurrency(state.currentLocale, entry.basePrice.value)}
          </Typography>
        </div>
      </div>
      <Typography
        as='div'
        className='text-center text-inherit w-2/12'
        variant='small'
      >
        {entry.quantity}
      </Typography>
      <Typography
        as='div'
        className='text-center text-inherit w-2/12'
        variant='small'
      >
        {localizeCurrency(state.currentLocale, entry.totalPrice.value)}
      </Typography>
      <div className='flex items-center justify-center w-3/12'>
        {status === 'cancelled' && (
          <Typography
            as='a'
            className='font-bold hover:bg-gray-100 hover:shadow-lg m-0 px-3 py-1 rounded-md text-center w-fit'
            color='inherit'
            href='#'
            variant='small'
          >
            {siteLabels['label.reorderItems']}
          </Typography>
        )}
        {status === 'delivered' && (
          <Typography
            as='a'
            className='font-bold hover:bg-gray-100 hover:shadow-lg m-0 px-3 py-1 rounded-md text-center w-fit'
            color='inherit'
            href='#'
            variant='small'
          >
            {siteLabels['label.returnItems']}
          </Typography>
        )}
        {status === 'received' && (
          <Typography
            as='a'
            className='font-bold hover:bg-gray-100 hover:shadow-lg m-0 px-3 py-1 rounded-md text-center w-fit'
            color='inherit'
            href='#'
            variant='small'
          >
            {siteLabels['label.cancelItems']}
          </Typography>
        )}
      </div>
    </div>
  );
};
