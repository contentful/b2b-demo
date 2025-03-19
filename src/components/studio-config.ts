'use client';
import { defineComponents } from '@contentful/experiences-sdk-react';
import { Alert, Avatar } from '@material-tailwind/react';
import {
  alertDefinition,
  Article,
  ArticleCard,
  articleCardDefinition,
  articleDefinition,
  ArticleList,
  articleListDefinition,
  avatarDefinition,
  Breadcrumbs,
  breadcrumbsDefinition,
  Button,
  buttonDefinition,
  DataTable,
  dataTableDefinition,
  DataWidget,
  dataWidgetDefinition,
  FAQ,
  faqDefinition,
  FAQList,
  faqListDefinition,
  Heading,
  headingDefinition,
  Hero,
  heroDefinition,
  InfoWidget,
  infoWidgetDefinition,
  LoginCard,
  loginCardDefinition,
  Menu,
  menuDefinition,
  OrderHistory,
  orderHistoryDefinition,
  ProductCollection,
  productCollectionDefinition,
  ProductDetails,
  productDetailsDefinition,
  PromoCard,
  promoCardDefinition,
  QuoteHistory,
  quoteHistoryDefinition,
  Rating,
  ratingDefinition,
  SearchResults,
  searchResultsDefinition,
  Testimonial,
  testimonialDefinition,
  TicketHistory,
  ticketHistoryDefinition,
} from './designSystem';

defineComponents([
  {
    component: Alert,
    definition: alertDefinition,
  },
  {
    component: Article,
    definition: articleDefinition,
  },
  {
    component: ArticleCard,
    definition: articleCardDefinition,
  },
  {
    component: ArticleList,
    definition: articleListDefinition,
  },
  {
    component: Avatar,
    definition: avatarDefinition,
  },
  {
    component: Breadcrumbs,
    definition: breadcrumbsDefinition,
  },
  {
    component: Button,
    definition: buttonDefinition,
  },
  {
    component: DataTable,
    definition: dataTableDefinition,
  },
  {
    component: DataWidget,
    definition: dataWidgetDefinition,
  },
  {
    component: FAQ,
    definition: faqDefinition,
  },
  {
    component: FAQList,
    definition: faqListDefinition,
  },
  {
    component: Heading,
    definition: headingDefinition,
  },
  {
    component: Hero,
    definition: heroDefinition,
  },
  {
    component: InfoWidget,
    definition: infoWidgetDefinition,
  },
  {
    component: LoginCard,
    definition: loginCardDefinition,
  },
  {
    component: Menu,
    definition: menuDefinition,
  },
  {
    component: OrderHistory,
    definition: orderHistoryDefinition,
  },
  {
    component: ProductCollection,
    definition: productCollectionDefinition,
  },
  {
    component: ProductDetails,
    definition: productDetailsDefinition,
  },
  {
    component: PromoCard,
    definition: promoCardDefinition,
  },
  {
    component: QuoteHistory,
    definition: quoteHistoryDefinition,
  },
  {
    component: Rating,
    definition: ratingDefinition,
  },
  {
    component: SearchResults,
    definition: searchResultsDefinition,
  },
  {
    component: TicketHistory,
    definition: ticketHistoryDefinition,
  },
  {
    component: Testimonial,
    definition: testimonialDefinition,
  },
]);
