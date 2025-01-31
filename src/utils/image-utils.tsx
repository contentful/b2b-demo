import { Product, SAPImage } from '@/models/commerce-types';
import { Asset } from 'contentful';

const SAPEndpoint = process.env.NEXT_PUBLIC_SAP_API_ENDPOINT;

const getContentfulImageUrl = (image: Asset | string): string | undefined => {
  if (!image) return;
  if (typeof image === 'string') {
    if (!image.startsWith('https:')) {
      return 'https:' + image;
    }
  } else {
    return `https:${image.fields?.file?.url}`;
  }
};

const getSAPProductImageUrl = (product: Product): string | undefined => {
  const productImage: SAPImage | undefined = product?.images.find(
    (image: SAPImage) => image.format === 'product'
  );
  if (!productImage) return;
  const url = `${SAPEndpoint}${productImage.url}`;
  return url;
};

export { getContentfulImageUrl, getSAPProductImageUrl };
