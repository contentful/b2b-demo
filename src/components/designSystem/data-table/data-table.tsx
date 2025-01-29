import { TailwindColors } from '@/components/designSystem/picker-options';
import { useAppContext, useSiteLabels } from '@/hooks';
import { getOrdersTableData, ORDER_DATA_COLS } from '@/mocks/orders';
import { getQuotesTableData, QUOTE_DATA_COLS } from '@/mocks/quotes';
import { getTicketsTableData, TICKET_DATA_COLS } from '@/mocks/tickets';
import { DataTableColumn, TableData } from '@/models/commerce-types';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import React from 'react';
import TableBody from './table-body';
import TableHead from './table-head';
import TableTitleBar from './table-title-bar';

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
  const { datatype, status, headbg, headtext } = props;
  const tableId = datatype + '-table';

  let bgcolor = 'bg-' + headbg;
  if (!['black', 'white', 'inherit'].includes(headbg)) {
    bgcolor = bgcolor + '-500';
  }

  let textcolor = 'text-' + headtext;
  if (!['black', 'white', 'inherit'].includes(headtext)) {
    textcolor = textcolor + '-500';
  }

  const [data, setData] = React.useState<Array<TableData>>();
  const [cols, setCols] = React.useState<Array<DataTableColumn>>();
  const [filter, setFilter] = React.useState<string>(props.status);
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

      switch (datatype) {
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
            datatype
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

  return (
    <>
      {(data || preview) && (
        <>
          <TableTitleBar
            {...{
              bgcolor,
              datatype,
              filter,
              handleOptionClick,
              preview,
              setSortOpen,
              siteLabels,
              sortOpen,
              sortOptions,
              textcolor,
            }}
          />
          <table id={tableId} className='bg-inherit my-1 table-fixed w-full'>
            <TableHead
              {...{ bgcolor, cols, data, preview, siteLabels, textcolor }}
            />
            <TableBody {...{ cols, data, locale, preview, siteLabels }} />
          </table>
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
    },
  },
};
