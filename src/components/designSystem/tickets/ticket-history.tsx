'use client';
import { ContentError, Heading, Sorts } from '@/components/designSystem';
import { useAppContext, useEditMode, useSiteLabels } from '@/hooks';
import { getTicketsTableData, QUOTE_DATA_COLS } from '@/mocks';
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
import { TableBody, TableHead } from '../data-table';
import TicketDetailsModal from './ticket-details-modal';

export default function TicketHistory(props: any) {
  const { editMode } = useEditMode();
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  const { cellpadding, headbg, headtext } = props;
  const locale = state.currentLocale;

  const [activeItem, setActiveItem] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [data, setData] = React.useState<Array<TableData>>();
  const [showDetails, setShowDetails] = React.useState(false);
  const [sort, setSort] = React.useState<string>('creationTime-desc');

  const sortValues = [
    'id-asc',
    'id-desc',
    'status-asc',
    'status-desc',
    'subject-asc',
    'subject-desc',
    'createdAt-asc',
    'createdAt-desc',
    'modifiedAt-asc',
    'modifiedAt-desc',
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

      const tableData = await getTicketsTableData(locale, key, value);

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
                  editMode,
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
                  editMode,
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
          <TicketDetailsModal code={activeItem} />
        </DialogBody>
        <DialogFooter className='px-4 py-2'>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const ticketHistoryDefinition: ComponentDefinition = {
  id: 'ticket-history',
  name: 'Ticket History',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/1ySuZ8w6kwxDwQ9ob0Wirz/66f4205de443160c23204c088f8ca359/clipboard-list-solid.svg',
  tooltip: {
    description: 'Enter your description here',
  },
  builtInStyles: [
    'cfBackgroundColor',
    'cfBorder',
    'cfBorderRadius',
    'cfFontSize',
    'cfLetterSpacing',
    'cfLineHeight',
    'cfMargin',
    'cfMaxWidth',
    'cfPadding',
    'cfTextAlign',
    'cfTextColor',
    'cfTextTransform',
    'cfWidth',
  ],
  variables: {},
};
