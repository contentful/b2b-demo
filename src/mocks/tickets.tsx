import { DataTableColumn } from '@/models/commerce-types';

export const TICKET_DATA_COLS: Array<DataTableColumn> = [
  { key: 'code', label: 'ID', format: 'text' },
  { key: 'status', label: 'Status', format: 'label' },
  { key: 'subject', label: 'Subject', format: 'text' },
  { key: 'creationTime', label: 'Created', format: 'datetime' },
  { key: 'updateTime', label: 'Updated', format: 'datetime' },
  { key: 'guid', label: 'User', format: 'text' },
];

const getTicket = async (id: string) => {
  return MockTickets.find((ticket) => ticket.id === id);
};

export const getTicketsByUser = async (
  guid: string,
  locale: string,
  tableData: boolean = false
) => {
  if (!guid || (tableData && !locale)) return;

  const tickets = tableData
    ? getTicketsTableData(locale, 'guid', guid)
    : getTickets('guid', guid);

  if (!tickets) return;

  return tickets;
};

export const getTickets = async (key: string, value: string) => {
  if (!(key && value)) return;

  const tickets = MockTickets.filter((quote: any) => quote[key] === value).sort(
    (a: any, b: any) => {
      if (a.createdDate > b.createdDate) return 1;
      if (a.createdDate < b.createdDate) return -1;
      return 0;
    }
  );

  if (!tickets) return;

  return tickets;
};

export const getTicketsTableData = async (
  locale: string,
  key: string,
  value: string
) => {
  if (!(key && value)) return;

  const tickets = MockTickets.filter(
    (ticket: any) => ticket[key] === value
  ).map((ticket: any) => {
    return {
      code: ticket.id,
      guid: ticket.customerId,
      subject: ticket.subject,
      creationTime: ticket.createdAt,
      updateTime: ticket.modifiedAt,
      status: ticket.status,
      ticketCategory: ticket.ticketCategory,
    };
  });

  if (!tickets) return;
  return tickets;
};

const MockTickets = [
  {
    id: '0005678',
    customerId: 'e0510389',
    subject: 'Beim Versand beschädigte Artikel',
    createdAt: '2025-01-15T20:29:09.386Z',
    modifiedAt: '2025-01-18T20:29:09.386Z',
    status: 'open',
    ticketEvents: [
      {
        code: '0001234',
        author: 'e0510389',
        createdAt: '2025-01-15T20:29:09.386Z',
        message: 'ticket created',
        addedByAgent: false,
        toStatus: 'open',
      },
      {
        code: '0002345',
        author: 'e0510389',
        createdAt: '2025-01-18T20:29:09.386Z',
        message: 'ticket updated',
        addedByAgent: false,
        toStatus: 'open',
      },
    ],
    ticketCategory: 'orders',
  },
  {
    id: '0001234',
    customerId: '4f2ec489',
    subject: 'Items missing from shipment',
    createdAt: '2025-01-15T20:29:09.386Z',
    modifiedAt: '2025-01-18T20:29:09.386Z',
    status: 'open',
    ticketEvents: [
      {
        code: '0001234',
        author: '4f2ec489',
        createdAt: '2025-01-15T20:29:09.386Z',
        message: 'ticket created',
        addedByAgent: false,
        toStatus: 'open',
      },
      {
        code: '0002345',
        author: '4f2ec489',
        createdAt: '2025-01-18T20:29:09.386Z',
        message: 'ticket updated',
        addedByAgent: false,
        toStatus: 'open',
      },
    ],
    ticketCategory: 'returns',
  },
];
