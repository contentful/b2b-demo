import { ContentfulClientApi, createClient } from 'contentful';

export const deliveryClient: ContentfulClientApi<undefined> = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export const previewClient: ContentfulClientApi<undefined> = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
});
