import { Asset, EntrySys } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export type ContentfulEntry = {
  sys: EntrySys;
  fields: any;
};

export type ArticleType = {
  title: string;
  type: string;
  image: Asset;
  teaser: Document;
  body: Document;
  faqs: Array<ContentfulEntry>;
  sources: Document;
  relatedArticles: Array<ContentfulEntry>;
  author: ContentfulEntry;
  pubDate: string;
  slug: string;
};

export type ArticleListType = {
  title: string;
  entries: Array<ContentfulEntry>;
};

export type FAQType = {
  question: string;
  answer: Document;
};

export type FAQListType = {
  title: string;
  entries: Array<ContentfulEntry>;
};

export type MenuType = {
  title: string;
  menuItems: Array<ContentfulEntry>;
};

export type MenuItemType = {
  text: string;
  url?: string;
  icon?: string;
  image: Asset;
  disallowedRoles?: Array<string>;
  openInNewWindow: boolean;
  children?: Array<ContentfulEntry>;
};

export type MockDataType = {
  title: string;
  dataTable: Document;
};

export type ProductListType = {
  title: string;
  entries: Array<string>;
};

export type ProfileType = {
  name: string;
  avatar: Asset;
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  email: string;
  socialLinks: Array<string>;
  bio: Document;
  slug: string;
};

export type PromotionType = {
  title: string;
  summary: string;
  description?: Document;
  image?: Asset;
  ctaText?: string;
  ctaUrl?: string;
  openInNewWindow?: boolean;
};

export type ResourceLabelType = {
  key: string;
  value: string;
};

export type SiteConfigType = {
  locale?: string;
  siteName?: string;
  siteDescription?: string;
  siteLogo?: Asset;
  copyright?: string;
  eyebrowMenu?: Array<any>;
  footerMenu1?: Array<any>;
  footerMenu2?: Array<any>;
  footerMenu3?: Array<any>;
  primaryMenu?: Array<any>;
  socialMenu?: Array<any>;
};

export type TestimonialType = {
  internalName: string;
  quote: string;
  reviewer?: string;
  rating?: number;
};

export type TestimonialsListType = {
  title: string;
  entries: Array<ContentfulEntry>;
};

export type WidgetType = {
  title: string;
  mockData: Document;
  description?: string;
  icon?: string;
};
