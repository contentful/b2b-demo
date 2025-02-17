import {
  OrderDetailsModal,
  QuoteDetailsModal,
} from '@/components/designSystem';
import { TailwindColors } from '@/components/designSystem/picker-options';
import { useAppContext, useSiteLabels } from '@/hooks';
import {
  getOrdersTableData,
  getQuotesTableData,
  getTicketsTableData,
  ORDER_DATA_COLS,
  QUOTE_DATA_COLS,
  TICKET_DATA_COLS,
} from '@/mocks';
import { DataTableColumn, TableData } from '@/models/commerce-types';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import React from 'react';
import TableBody from './table-body';
import TableHead from './table-head';
import TableTitleBar from './table-title-bar';
import TicketDetailsModal from '../tickets/ticket-details-modal';

export const PREVIEW_COLS = ['', 'A', 'B', 'C', 'D', 'E', 'F'];
export const PREVIEW_ROWS = [1, 2, 3, 4, 5, 6];
const ORDERS_SORT_OPTIONS = ['all', 'delivered', 'received', 'shipped'];
const QUOTES_SORT_OPTIONS = [
  'all',
  'approved',
  'expired',
  'saved',
  'submitted',
];

export default function DataTable(props: any) {
  const preview = props.isInExpEditorMode;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const { currentLocale: locale } = state;
  const {
    datatype,
    status,
    headbg,
    headtext,
    cellpadding,
    titlebg,
    titletext,
  } = props;
  const tableId = datatype + '-table';

  const [cols, setCols] = React.useState<Array<DataTableColumn>>();
  const [data, setData] = React.useState<Array<TableData>>();
  const [filter, setFilter] = React.useState<string>(props.status);
  const [activeItem, setActiveItem] = React.useState<string | null>();
  const [showDetails, setShowDetails] = React.useState(false);
  const [sortOptions, setSortOptions] = React.useState<Array<string>>();
  const [sortOpen, setSortOpen] = React.useState(false);

  React.useEffect(() => {
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

      let tableData: any;
      let colsArray;
      let sortOpts = new Array();

      switch (props.datatype) {
        case 'quotes':
          tableData = await getQuotesTableData(locale, key, value);
          colsArray = QUOTE_DATA_COLS;
          sortOpts = QUOTES_SORT_OPTIONS;
          break;
        case 'orders':
          tableData = await getOrdersTableData(locale, key, value);
          colsArray = ORDER_DATA_COLS;
          sortOpts = ORDERS_SORT_OPTIONS;
          break;
        case 'tickets':
          tableData = await getTicketsTableData(locale, 'customerId', value);
          colsArray = TICKET_DATA_COLS;
          sortOpts = ['all'];
          break;
        default:
          console.error(
            'DataTable :: useEffect :: unsupported data type',
            props.datatype
          );
          return;
      }

      if (!tableData) return;
      let filteredTableData: Array<any> = tableData;

      if (filter !== 'all') {
        filteredTableData = filteredTableData?.filter(
          (td: any) => td.status === filter
        );
      }

      if (filteredTableData) {
        setData(filteredTableData);
        setCols(colsArray);
        setSortOptions(sortOpts);
      }
    };

    getTableData();
  }, [filter, state, props]);

  const handleOptionClick = (val: string) => {
    setFilter(val);
    setSortOpen(false);
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
      {(data || preview) && (
        <>
          <TableTitleBar
            {...{
              datatype,
              filter,
              handleOptionClick,
              preview,
              setSortOpen,
              siteLabels,
              sortOpen,
              sortOptions,
              titlebg,
              titletext,
            }}
          />
          <table id={tableId} className='bg-inherit mb-1 table-fixed w-full'>
            <TableHead
              {...{
                cellpadding,
                cols,
                data,
                headbg,
                headtext,
                preview,
                siteLabels,
              }}
            />
            <TableBody
              {...{
                cellpadding,
                cols,
                data,
                handleOpenDetails,
                headbg,
                headtext,
                locale,
                preview,
                siteLabels,
              }}
            />
          </table>

          <Dialog handler={handleOpenDetails} open={showDetails} size='lg'>
            <DialogHeader className='flex items-center justify-between'>
              {siteLabels['label.itemDetails']}
            </DialogHeader>
            <DialogBody>
              {props.datatype === 'orders' && (
                <OrderDetailsModal code={activeItem} />
              )}
              {props.datatype === 'quotes' && (
                <QuoteDetailsModal code={activeItem} />
              )}
              {props.datatype === 'tickets' && (
                <TicketDetailsModal code={activeItem} />
              )}
            </DialogBody>
            <DialogFooter>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogFooter>
          </Dialog>
        </>
      )}
    </>
  );
}

export const dataTableDefinition: ComponentDefinition = {
  component: DataTable,
  definition: {
    id: 'data-table',
    name: 'Data Table',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Displays a table of mock data',
    },
    builtInStyles: ['cfTextColor', 'cfLineHeight'],
    variables: {
      datatype: {
        displayName: 'Data Type',
        type: 'Text',
        group: 'style',
        builtInStyles: ['cfMargin', 'cfPadding'],
        defaultValue: 'quotes',
        validations: {
          in: [
            { displayName: 'quotes', value: 'quotes' },
            { displayName: 'orders', value: 'orders' },
            { displayName: 'tickets', value: 'tickets' },
          ],
        },
      },
      status: {
        displayName: 'Status',
        type: 'Text',
        group: 'style',
        defaultValue: 'all',
        validations: {
          in: [
            { displayName: 'all', value: 'all' },
            { displayName: 'approved', value: 'approved' },
            { displayName: 'cancelled', value: 'cancelled' },
            { displayName: 'delivered', value: 'delivered' },
            { displayName: 'expired', value: 'expired' },
            { displayName: 'saved', value: 'saved' },
            { displayName: 'shipped', value: 'shipped' },
            { displayName: 'submitted', value: 'submitted' },
          ],
        },
      },
      titlebg: {
        displayName: 'Widget Title Background Color',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: TailwindColors,
        },
      },
      titletext: {
        displayName: 'Widget Title Text Color',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: TailwindColors,
        },
      },
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
