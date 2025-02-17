import { useAppContext, useSiteLabels } from '@/hooks';
import { localizeDate } from '@/utils/locale-utils';
import { Typography } from '@material-tailwind/react';

export const QuoteDetailsHeader = (props: any) => {
  const { details } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  return (
    <div className='bg-gray-200 flex gap-2 items-start justify-start px-4 py-2'>
      <div className='flex flex-col gap-2 w-1/3'>
        <div>
          <Typography variant='h6'>
            {siteLabels['label.quoteNumber']}
          </Typography>
          <Typography className='' color='inherit' variant='small'>
            {details.code}
          </Typography>
        </div>
        <div>
          <Typography variant='h6'>
            {siteLabels['label.creationTime']}
          </Typography>
          <Typography className='' color='inherit' variant='small'>
            {localizeDate(state.currentLocale, details.creationTime)}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-1/3'>
        <div>
          <Typography variant='h6'>{siteLabels['label.poNumber']}</Typography>
          <Typography className='' color='inherit' variant='small'>
            {details.purchaseOrderNumber}
          </Typography>
        </div>
        <div>
          <Typography variant='h6'>{siteLabels['label.costCenter']}</Typography>
          <Typography className='' color='inherit' variant='small'>
            {details.costCenter?.name}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-1/3'>
        <div>
          <Typography variant='h6'>
            {siteLabels['label.deliveryAddress']}
          </Typography>
          {details.deliveryAddress && (
            <Typography className='' color='inherit' variant='small'>
              {details.deliveryAddress?.street1}
              <br />
              {details.deliveryAddress.street2 &&
                `${details.deliveryAddress.street2}<br />`}
              {`${details.deliveryAddress.city}${
                details.deliveryAddress.stateOrProvince &&
                `, ${details.deliveryAddress.stateOrProvince}`
              } ${details.deliveryAddress.postalcode}`}
              <br />
              {details.deliveryAddress.countryCode}
            </Typography>
          )}
        </div>
        <div>
          <Typography variant='h6'>
            {siteLabels['label.deliveryMode']}
          </Typography>
          {details.deliveryMode && (
            <Typography className='' color='inherit' variant='small'>
              {details.deliveryMode.name}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
