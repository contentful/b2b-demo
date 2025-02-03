import { ContentfulEntry } from '@/models/content-types';
import { deliveryClient } from '@/services/contentful/client';

const CONFIG_ID =
  process.env.NEXT_PUBLIC_CONTENTFUL_SITE_CONFIG_ID || '2iJ0rBLZHI267VZ49c9sqj';
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;

const ARTICLE_CONTENT_TYPE = 'article';
const PROFILE_CONTENT_TYPE = 'profile';
const RESOURCE_LABEL_CONTENT_TYPE = 'resourceLabel';

export const getArticle = async (
  slug: string,
  locale: string
): Promise<any> => {
  const entryQuery = {
    content_type: ARTICLE_CONTENT_TYPE,
    'fields.slug[in]': slug,
    locale,
  };

  try {
    const response = await deliveryClient.getEntries(entryQuery);
    const { sys, ...other } = await response;

    if (sys?.type.toLowerCase() === 'error') {
      const { message, details } = other as any;
      throw new Error(message, { cause: details });
    }

    const { items } = other;
    if (items.length === 0) {
      const message = 'The resource could not be found.';
      const details = {
        type: 'Entry',
        slug,
        environment: ENVIRONMENT_ID,
        space: SPACE_ID,
      };
      throw new Error(message, { cause: details });
    }

    return items[0].fields;
  } catch (error: any) {
    const { message, cause } = error;
    console.error('ERROR::ContentService::getArticle::' + message, cause);
    throw new Error(message);
  }
};

export const getArticles = async (
  queryParams: Record<string, any>
): Promise<any> => {
  const entriesQuery: any = {
    content_type: ARTICLE_CONTENT_TYPE,
    ...queryParams,
  };

  try {
    const response = await deliveryClient.getEntries(entriesQuery);
    const json: any = await response;

    const { sys, ...other } = json;
    if (sys?.type.toLowerCase() === 'error') {
      const { message, details } = other;
      throw new Error(message, { cause: details });
    }

    const { total, skip, limit, items, includes } = other;
    const pagination = {
      currentPage: skip > 0 ? Math.floor(skip / limit) : 0,
      pageSize: limit,
      skip: skip,
      totalResults: total,
      totalPages:
        total % limit === 0 ? total / limit : Math.ceil(total / limit),
    };

    const entries = items.map((i: ContentfulEntry) => {
      return i.fields;
    });

    return { entries, pagination };
  } catch (error: any) {
    const { message, cause } = error;
    console.error('ERROR::ContentService::getArticles::' + message, cause);
    throw new Error(message);
  }
};

export const getProfile = async (
  slug: string,
  locale: string
): Promise<any> => {
  const entryQuery = {
    content_type: PROFILE_CONTENT_TYPE,
    'fields.slug[in]': slug,
    locale,
  };

  try {
    const response = await deliveryClient.getEntries(entryQuery);
    const { sys, ...other } = await response;

    if (sys?.type.toLowerCase() === 'error') {
      const { message, details } = other as any;
      throw new Error(message, { cause: details });
    }

    const items: Array<ContentfulEntry> = other.items;
    if (items.length === 0) {
      const message = 'The resource could not be found.';
      const details = {
        type: 'Entry',
        slug,
        environment: ENVIRONMENT_ID,
        space: SPACE_ID,
      };
      throw new Error(message, { cause: details });
    }

    return items[0].fields;
  } catch (error: any) {
    const { message, cause } = error;

    console.error('ERROR::ContentService::getProfile::' + message, cause);
    throw new Error(message);
  }
};

export const getSiteConfig = async (locale?: string): Promise<any> => {
  try {
    const response = await deliveryClient.getEntry(CONFIG_ID, {
      locale,
    });

    const { sys, ...other } = await response;
    if (sys?.type.toLowerCase() === 'error') {
      const { message, details } = other as any;
      throw new Error(message, { cause: details });
    }

    const { fields } = other;
    const siteConfig: any = {
      locale: sys.locale || 'en-US',
      copyright: fields.copyright,
      eyebrowMenu: fields.eyebrowMenu,
      footerMenu1: fields.footerMenu1,
      footerMenu2: fields.footerMenu2,
      footerMenu3: fields.footerMenu3,
      primaryMenu: fields.primaryMenu,
      siteDescription: fields.siteDescription,
      siteLogo: fields.siteLogo,
      siteName: fields.siteName,
      socialMenu: fields.socialMenu,
    };

    return siteConfig;
  } catch (error: any) {
    const { message, cause } = error;
    console.error('ERROR::ContentService::getSiteConfig::' + message, cause);
    throw new Error(message);
  }
};

export const getSiteLabels = async (locale: string): Promise<any> => {
  const response = await deliveryClient.getEntries({
    content_type: RESOURCE_LABEL_CONTENT_TYPE,
    locale,
  });

  try {
    const { sys, ...other } = await response;

    if (sys?.type.toLowerCase() === 'error') {
      const { message, details } = other as any;
      throw new Error(message, { cause: details });
    }

    const items: Array<ContentfulEntry> = other.items;
    let resourceLabels = Object.fromEntries(
      items.map((entry) => {
        const { key, value } = entry.fields;
        return [key, value];
      })
    );

    return { ...resourceLabels, locale };
  } catch (error: any) {
    const { message, cause } = error;
    console.error('ERROR::ContentService::getSiteLabels::' + message, cause);
    throw new Error(message);
  }
};
