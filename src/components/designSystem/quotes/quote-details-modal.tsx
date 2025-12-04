import { getQuote } from '@/mocks';
import React from 'react';
import { QuoteDetailsEntries } from './quote-details-entries';
import { QuoteDetailsFooter } from './quote-details-footer';
import { QuoteDetailsHeader } from './quote-details-header';
import { QuoteDetailsStatus } from './quote-details-status';

export default function QuoteDetailsModal(props: any) {
  const { code } = props;

  const [details, setDetails] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    let isMounted = true;

    const getQuoteDetails = async () => {
      const quoteDetails = await getQuote(code);
      if (!quoteDetails) return;
      if (isMounted) {
        setDetails(quoteDetails);
      }
    };

    getQuoteDetails();
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
            <QuoteDetailsHeader {...{ details }} />
            <QuoteDetailsStatus {...{ details }} />
          </div>
          {details.entries && <QuoteDetailsEntries {...{ details }} />}
          <QuoteDetailsFooter {...{ details }} />
        </>
      )}
    </div>
  );
}
