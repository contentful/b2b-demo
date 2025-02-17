import { getOrder } from '@/mocks';
import React from 'react';
import { OrderDetailsEntries } from './order-details-entries';
import { OrderDetailsFooter } from './order-details-footer';
import { OrderDetailsHeader } from './order-details-header';
import { OrderDetailsStatus } from './order-details-status';

export default function OrderDetailsModal(props: any) {
  const { code } = props;

  const [details, setDetails] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    let isMounted = true;

    const getOrderDetails = async () => {
      const orderDetails = await getOrder(code);
      if (!orderDetails) return;
      if (isMounted) {
        setDetails(orderDetails);
      }
    };

    getOrderDetails();
    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className='flex flex-col gap-2 h-fit max-h-96 overflow-y-auto w-full'>
      {error && <div>{error}</div>}

      {details && (
        <>
          <div className='flex flex-col gap-2 h-1/3 w-full'>
            <OrderDetailsHeader {...{ details }} />
            <OrderDetailsStatus {...{ details }} />
          </div>
          {details.entries && <OrderDetailsEntries {...{ details }} />}
          <OrderDetailsFooter {...{ details }} />
        </>
      )}
    </div>
  );
}
