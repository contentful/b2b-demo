import { useAppContext, useSiteLabels } from '@/hooks';
import { localizeCurrency } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';

export const OrderDetailsFooter = (props: any) => {
  const { details } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='bg-gray-200 flex flex-col gap-0 h-1/3 px-4 py-2 w-full'>
      <Typography
        className='font-bold mb-2 w-full'
        color='inherit'
        variant='h6'
      >
        {siteLabels['label.orderSummary']}
      </Typography>
      <div className='bg-gray-200 flex items-center justify-between w-full'>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {siteLabels['label.subtotalAfterDiscounts']}
        </Typography>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {localizeCurrency(state.currentLocale, details.subTotal.value)}
        </Typography>
      </div>
      <div className='bg-gray-200 flex items-center justify-between w-full'>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {siteLabels['label.shipping']}
        </Typography>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {localizeCurrency(
            state.currentLocale,
            details.deliveryMode.deliveryCost.value
          )}
        </Typography>
      </div>
      <div className='bg-gray-200 flex items-center justify-between w-full'>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {siteLabels['label.tax']}
        </Typography>
        <Typography
          className='mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {localizeCurrency(state.currentLocale, details.totalTax.value)}
        </Typography>
      </div>
      <div className='bg-gray-200 flex items-center justify-between w-full'>
        <Typography
          className='font-bold mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {siteLabels['label.total']}
        </Typography>
        <Typography
          className='font-bold mb-0 text-inherit w-fit'
          color='inherit'
          variant='small'
        >
          {localizeCurrency(state.currentLocale, details.totalPrice.value)}
        </Typography>
      </div>
    </div>
  );
};
