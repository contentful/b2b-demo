import { Product, SAPImage } from '@/models/commerce-types';
import { Asset } from 'contentful';

const SAPEndpoint = process.env.NEXT_PUBLIC_SAP_API_ENDPOINT;

const getContentfulImageDescription = (
  image: Asset | string,
  fallback: string
): string => {
  if (typeof image === 'string') {
    if (!image.startsWith('https:')) {
      return fallback || '';
    }
  } else {
    if (typeof image.fields.description === 'string') {
      return image.fields?.description || fallback || '';
    }
  }
  return fallback || '';
};

const getContentfulImageUrl = (image: Asset | string): string | null => {
  if (!image) return null;
  if (typeof image === 'string') {
    if (!image.startsWith('https:')) {
      return 'https:' + image;
    }
  } else {
    return `https:${image.fields?.file?.url}`;
  }
  return null;
};

const getSAPProductImageUrl = (product: Product): string | null => {
  const productImage: SAPImage | undefined = product?.images.find(
    (image: SAPImage) => image.format === 'product'
  );
  if (!productImage) return null;
  const url = `${SAPEndpoint}${productImage.url}`;
  return url;
};

export {
  getContentfulImageDescription,
  getContentfulImageUrl,
  getSAPProductImageUrl,
};
