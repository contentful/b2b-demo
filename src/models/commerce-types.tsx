export type AccountSummary = {
  orgUnit: Omit<B2BUnit, 'active'>;
  amountBalance: AmountBalance;
  billingAddress: Address;
  creditLimit: string;
  accountManagerName: string;
  accountManagerEmail: string;
};

export type AmountBalance = {
  openBalance: string;
  pastDueBalance: string;
  currentBalance: string;
  dueBalances: Array<DueBalanceRange>;
};

export type Address = {
  id: string;
  street1: string;
  street2?: string;
  city: string;
  stateOrProvince?: string;
  countryCode: 'US' | 'DE';
  postalcode: string;
  defaultAddress: boolean;
  shippingAddress: boolean;
  visible?: boolean;
};

export type B2BCart = {
  code: string;
  guid: string;
  orgUnit: string;
  entries: Array<OrderEntry>;
  totalItems: number;
  totalUnitCount: number;
  subTotal: Price;
  totalDiscounts?: Price;
  totalTax?: Price;
  totalPriceWithTax?: Price;
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  totalPrice: Price;
  purchaseOrderNumber: string;
  costCenter?: B2BCostCenter;
  creationTime: string;
  updateTime: string;
};

export type B2BCostCenter = {
  code: string;
  name: string;
  activeFlag: boolean;
  currency: Currency;
  unit?: B2BUnit;
  assignedBudgets?: Array<Budget>;
};

export type B2BUnit = {
  uid: string;
  name: string;
  addresses?: Array<Address>;
  approvers?: Array<User>;
  managers?: Array<User>;
  administrators?: Array<User>;
  customers?: Array<User>;
  costCenters?: Array<Omit<B2BCostCenter, 'unit' | 'assignedBudgets'>>;
};

export type BillingDocument = {
  id: string;
  type: string;
  date: Date;
  totalPrice: Price;
};

export type Breadcrumb = {
  facetCode: string;
  facetName: string;
  facetValueCode: string;
  facetValueName: string;
  removeQuery: SearchState;
  truncateQuery: SearchState;
};

export type Budget = {
  code: string;
  budget: Price;
  currency: Currency;
};

export type Category = {
  code: string;
  name: string;
  url: string;
  image: SAPImage;
};

export type Coordinates = [number, number];

export type Country = {
  name: string;
  capital: string;
  code: string;
  currencies: Currency[];
  languages: Language[];
  coordinates: Coordinates;
  area: number;
  maps: MapSet;
  population: number;
  postalCode: PostalCode;
  flags: FlagSet;
  emoji: string;
  countryCallingCode: string;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type DataTableColumn = {
  key: string;
  label: string;
  format: string;
};

export type DeliveryMode = {
  code: string;
  name: string;
  deliveryCost: Price;
};

export type DueBalanceRange = {
  dayRange: {
    minBoundry: Price;
    maxBoundary?: Price;
  };
  amount: string;
};

export type Facet = {
  name: string;
  priority: number;
  category: boolean;
  multiSelect: boolean;
  visible: boolean;
  values: Array<FacetValue>;
  topValues?: Array<FacetValue>;
};

export type FacetValue = {
  name: string;
  count: number;
  query: SearchState;
  selected: boolean;
};

export type FlagSet = {
  png: string;
  svg: string;
};

export type Language = {
  isocode: string;
  name: string;
  nativeName: string;
  active: boolean;
};

export type MapSet = {
  googleMaps: string;
  openStreetMaps: string;
};

export type Order = {
  code: string;
  status: string;
  guid: string;
  orgUnit: string;
  entries?: Array<OrderEntry>;
  totalItems: number;
  totalUnitCount: number;
  subTotal: Price;
  totalDiscounts?: Price;
  totalTax?: Price;
  totalPriceWithTax?: Price;
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  totalPrice: Price;
  purchaseOrderNumber: string;
  costCenter?: B2BCostCenter;
  creationTime: string;
  expirationTime: string;
  updateTime: string;
};

export type OrderTableData = TableData & {
  purchaseOrderNumber: string;
  totalPrice: string;
  expirationTime: string;
  totalItems: number;
  totalUnitCount: number;
  delivery: string;
  costCenterCode: string;
};

export type OrderEntry = {
  entryNumber: number;
  quantity: number;
  basePrice: Price;
  totalPrice: Price;
  product: Product;
  cancellableQuantity?: number;
  returnableQuantity?: number;
};

export type OrderFormEntry = {
  sku: string;
  quantity: number;
};

export type OrderForm = {
  code: string;
  description: string;
  currency: Currency;
  user: User;
  entries: Array<OrderFormEntry>;
};

export type Pagination = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type PostalCode = {
  format: string;
  regex: string;
};

export type Price = {
  currencyIso?: string;
  value: number;
  priceType?: string;
  formattedValue?: string;
};

export type PriceRange = {
  minPrice?: Price;
  maxPrice?: Price;
};

export type Product = {
  code: string;
  name: string;
  description?: string;
  summary?: string;
  manufacturer: string;
  categories?: Array<Category>;
  images: Array<SAPImage>;
  price: Price;
  priceRange: PriceRange;
  stock: Stock;
  numberOfReviews?: number;
  averageRating?: number;
  tags?: Array<string>;
};

export type ProductSearchPage = {
  freeTextSearch?: string;
  categoryCode?: string;
  keywordRedirectUrl?: string;
  spellingSuggestion?: SpellingSuggestion;
  products: Array<Product>;
  sorts: Array<Sort>;
  pagination: Pagination;
  currentQuery: SearchState;
  breadcrumbs: Array<Breadcrumb>;
  facets: Array<Facet>;
};

export type Quote = {
  code: string;
  status: string;
  guid: string;
  orgUnit: string;
  entries: Array<OrderEntry>;
  totalItems: number;
  totalUnitCount: number;
  subTotal: Price;
  totalDiscounts: Price;
  totalTax?: Price;
  totalPriceWithTax?: Price;
  deliveryAddress?: Address;
  deliveryMode: DeliveryMode;
  totalPrice: Price;
  purchaseOrderNumber: string;
  costCenter?: B2BCostCenter;
  creationTime: string;
  expirationTime: string;
  updateTime: string;
};

export type QuoteTableData = TableData & {
  purchaseOrderNumber: string;
  totalPrice: string;
  expirationTime: string;
  totalItems: number;
  totalUnitCount: number;
  delivery: string;
  costCenterCode: string;
};

export type ReplinishmentOrder = {
  code: string;
  replenishmentOrderCode: string;
  name: string;
  description?: string;
  expirationTime: Date;
  entries: Array<OrderEntry>;
  totalItems: number;
  totalUnitCount?: number;
  subTotal: Price;
  totalDiscounts?: Price;
  deliveryMode?: DeliveryMode;
  deliveryAddress?: Address;
  deliveryCost?: Price;
  totalTax: Price;
  totalPriceWithTax: Price;
  totalPrice: Price;
  sapBillingAddress?: Address;
  costCenter?: B2BCostCenter;
  purchaseOrderNumber?: string;
  sapQuote?: Quote;
  saveTime: Date;
  guid: string;
};

export type ReturnRequest = {
  code: string;
  creationTime: Date;
  cancellable: boolean;
  order: Order;
  returnEntries: Array<ReturnRequestEntry>;
  status: string;
  deliveryCost: Price;
  refundDeliveryCost: Price;
  subTotal: Price;
  totalPrice: Price;
};

export type ReturnRequestEntry = {
  orderEntry: OrderEntry;
  expectedQuantity: number;
  refundAmount: Price;
};

export type SAPError = {
  type: string;
  errorCode: string;
  reason: string;
  message: string;
  subjectType?: string;
  subject?: string;
  language?: string;
  position?: number;
  exceptionMessage?: string;
};

export type SAPErrorList = {
  description: string;
  errors: Array<SAPError>;
};

export type SAPImage = {
  format: string;
  imageType: string;
  url: string;
  altText?: string;
  galleryIndex?: number;
};

export type SearchState = {
  url: string;
  query: {
    value: string;
  };
};

export type Sort = {
  code: string;
  name: string;
  asc: boolean;
  selected: boolean;
};

export type SortOption = {
  displayName: string;
  selected: boolean;
  value: string;
};

export type SpellingSuggestion = {
  suggestion: string;
  query: string;
};

export type StatusSummary = {
  status: string;
  numberOfIssues: number;
};

export type Stock = {
  stockLevelStatus?: string;
  stockLevel?: number;
  isValueRounded?: boolean;
};

export type TableData = {
  code: string;
  status: string;
  guid: string;
  orgUnit?: string;
  creationTime: string;
  updateTime: string;
};

export type Ticket = {
  id: string;
  customerId: string;
  subject: string;
  createdAt: string;
  modifiedAt?: string;
  status: string;
  ticketEvents: Array<TicketEvent>;
  ticketCategory: string;
};

export type TicketEvent = {
  code: string;
  author: string;
  createdAt: string;
  message: string;
  addedByAgent: boolean;
  toStatus: string;
};

export type TicketTableData = TableData & {
  subject: string;
  ticketCategory: string;
};

export type User = {
  uid: string;
  name: string;
  firstName: string;
  lastName: string;
  currency: Currency;
  language: Language;
  userAvatar?: UserAvatar;
  orgUnit: string;
  roles: Array<string>;
  email: string;
  country: Country;
};

export type UserAvatar = {
  url: string;
  format?: string;
};
