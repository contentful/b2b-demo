import { ContentError, Heading, Sorts } from '@/components/designSystem';
import { TableBody, TableHead } from '@/components/designSystem/data-table';
import { TailwindColors } from '@/components/designSystem/picker-options';
import { useAppContext, useSiteLabels } from '@/hooks';
import { getQuotesTableData, QUOTE_DATA_COLS } from '@/mocks';
import { TableData } from '@/models/commerce-types';
import { sortTableData } from '@/utils/table-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import React from 'react';
import QuoteDetailsModal from './quote-details-modal';

export default function QuoteHistory(props: any) {
  const preview = props.isInExpEditorMode;
  const { cellpadding, headbg, headtext } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const locale = state.currentLocale;

  const [activeItem, setActiveItem] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [data, setData] = React.useState<Array<TableData>>();
  const [showDetails, setShowDetails] = React.useState(false);
  const [sort, setSort] = React.useState<string>('creationTime-desc');

  const sortValues = [
    'code-asc',
    'code-desc',
    'creationTime-asc',
    'creationTime-desc',
    'expirationTime-asc',
    'expirationTime-desc',
    'status-asc',
    'status-desc',
    'totalPrice-asc',
    'totalPrice-desc',
  ];

  const sortOptions = sortValues.map((value: string) => {
    const displayName = siteLabels['option.sort.' + value];
    return {
      displayName,
      value,
      selected: value === sort,
    };
  });

  React.useEffect(() => {
    let isMounted = true;
    const {
      currentLocale: locale,
      currentOrgUnit: orgUnit,
      currentUser: guid,
      currentUserRoles: roles,
    } = state;

    const getTableData = async () => {
      const { key, value } = roles.includes('customer')
        ? { key: 'guid', value: guid }
        : { key: 'orgUnit', value: orgUnit };

      const tableData = await getQuotesTableData(locale, key, value);

      if (!tableData) return;
      if (isMounted) {
        let sortedTableData = sortTableData(tableData, sort);
        if (sortedTableData) setData(sortedTableData);
      }
    };

    getTableData();

    return () => {
      isMounted = false;
    };
  }, [state, sort]);

  const handleChangeSort = (value: string) => {
    if (!value) return;
    const sortedTableData = sortTableData(data, value);
    if (sortedTableData) {
      setData(sortedTableData);
      setSort(value);
    }
  };

  const handleOpenDetails = (code: string) => {
    setActiveItem(code);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setActiveItem(null);
  };

  return (
    <>
      <div className='flex flex-col h-fit items-center justify-center max-w-screen-xl mx-auto w-full'>
        {error ? (
          <ContentError error={error} />
        ) : (
          <>
            <div className='flex items-center justify-between px-3 w-full'>
              <Heading className='w-fit' variant={props.headingVariant || 'h5'}>
                {siteLabels['label.quoteHistory']}
              </Heading>
              <div className='flex gap-2 items-center py-4 w-fit'>
                <Sorts {...{ handleChangeSort, sortOptions }} />
              </div>
            </div>
            <table className='bg-inherit my-1 table-fixed w-full'>
              <TableHead
                cols={QUOTE_DATA_COLS}
                {...{
                  cellpadding,
                  data,
                  headbg,
                  headtext,
                  preview,
                  siteLabels,
                }}
              />
              <TableBody
                cols={QUOTE_DATA_COLS}
                {...{
                  data,
                  cellpadding,
                  headbg,
                  handleOpenDetails,
                  locale,
                  preview,
                  siteLabels,
                }}
              />
            </table>
          </>
        )}
      </div>
      <Dialog handler={handleOpenDetails} open={showDetails} size='lg'>
        <DialogHeader className='flex items-center justify-between px-4 py-2'>
          {siteLabels['label.quoteDetails']}
        </DialogHeader>
        <DialogBody className='px-4 py-0'>
          <QuoteDetailsModal code={activeItem} />
        </DialogBody>
        <DialogFooter className='px-4 py-2'>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const quoteHistoryDefinition: ComponentDefinition = {
  component: QuoteHistory,
  definition: {
    id: 'quote-history',
    name: 'Quote History',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Enter your description here',
    },
    variables: {
      headbg: {
        displayName: 'Table Heading Background Color',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: TailwindColors,
        },
      },
      headtext: {
        displayName: 'Table Heading Text Color',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: TailwindColors,
        },
      },
      cellpadding: {
        displayName: 'Cellpadding',
        type: 'Text',
        group: 'style',
        defaultValue: 'py-1',
        validations: {
          in: [
            { displayName: 'xs', value: 'py-1' },
            { displayName: 'sm', value: 'py-2' },
            { displayName: 'md', value: 'py-3' },
            { displayName: 'lg', value: 'py-4' },
            { displayName: 'xl', value: 'py-6' },
            { displayName: '2xl', value: 'py-8' },
          ],
        },
      },
    },
  },
};
