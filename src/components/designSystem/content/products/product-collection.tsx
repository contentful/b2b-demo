'use client';

import { EditText, ProductList } from '@/components/designSystem';
import { useAppContext } from '@/hooks';
import { Product } from '@/models/commerce-types';
import { getProducts } from '@/services/sap/products';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Alert, Spinner } from '@material-tailwind/react';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import ProductCarousel from './product-carousel';

export default function ProductCollection(props: any) {
  const preview = props.isInExpEditorMode;
  const { entries, variant: collectionVariant, ...passedProps } = props;
  const { state } = useAppContext();

  const [error, setError] = React.useState<any>();
  const [products, setProducts] = React.useState<Array<Product>>();
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const [lang] = state.currentLocale.split('-');
      const filters = props.entries
        .map((url: string) => {
          return 'code:' + url.substring(url.lastIndexOf('/') + 1);
        })
        .join(':');

      await getProducts({
        filters,
        lang,
      })
        .then((results) => {
          if (isMounted) {
            const { products } = results;
            setProducts(products);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setError(error);
          setShowAlert(true);
        });
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [props, state]);

  return (
    <>
      {error && (
        <Alert
          color='red'
          className='flex justify-center rounded-none'
          onClose={() => setShowAlert(false)}
          open={showAlert}
          variant='outlined'
        >
          <div
            className='max-w-screen-xl my-0 mx-auto p-0 text-inherit'
            dangerouslySetInnerHTML={{ __html: error.message }}
          />
        </Alert>
      )}
      {!products && !error ? (
        preview ? (
          <EditText type='Product Collection' />
        ) : (
          <div className='flex flex-col h-80 items-center justify-center w-full'>
            <Spinner className='h-20 w-20' color='amber' />
          </div>
        )
      ) : (
        products &&
        (props.variant === 'list' ? (
          <div className='flex flex-col md:flex-row items-center justify-center max-w-screen-xl min-h-40 mx-auto pb-6 w-full'>
            <ProductList {...{ variant: 'card', products, ...passedProps }} />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center max-w-screen-xl min-h-40 mx-auto pb-6 w-full'>
            <ProductCarousel {...{ products, ...passedProps }} />
          </div>
        ))
      )}
    </>
  );
}

export const productCollectionDefinition: ComponentDefinition = {
  component: ProductCollection,
  definition: {
    id: 'product-list',
    name: 'Product Collection',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'curated collection of products',
    },
    builtInStyles: [
      'cfBackgroundColor',
      'cfMargin',
      'cfPadding',
      'cfTextColor',
    ],
    variables: {
      entries: {
        displayName: 'Entries',
        type: 'Array',
        group: 'content',
      },
      variant: {
        displayName: 'Variant',
        type: 'Text',
        group: 'style',
        defaultValue: 'list',
        validations: {
          in: [
            { displayName: 'Card Carousel', value: 'carousel' },
            { displayName: 'Card List', value: 'list' },
          ],
        },
      },
      lgcols: {
        displayName: 'Cards per row (tablet)',
        type: 'Number',
        group: 'style',
        defaultValue: 4,
        validations: {
          in: [
            { displayName: '1', value: 1 },
            { displayName: '2', value: 2 },
            { displayName: '3', value: 3 },
            { displayName: '4', value: 4 },
          ],
        },
      },
      xlcols: {
        displayName: 'Cards per row on (desktop)',
        type: 'Number',
        group: 'style',
        defaultValue: 5,
        validations: {
          in: [
            { displayName: '1', value: 1 },
            { displayName: '2', value: 2 },
            { displayName: '3', value: 3 },
            { displayName: '4', value: 4 },
            { displayName: '5', value: 5 },
          ],
        },
      },
      xxlcols: {
        displayName: 'Cards per row (widescreen)',
        type: 'Number',
        group: 'style',
        defaultValue: 6,
        validations: {
          in: [
            { displayName: '1', value: 1 },
            { displayName: '2', value: 2 },
            { displayName: '3', value: 3 },
            { displayName: '4', value: 4 },
            { displayName: '5', value: 5 },
            { displayName: '6', value: 6 },
          ],
        },
      },
      border: {
        description: 'Display a border around each product card',
        displayName: 'Border',
        type: 'Text',
        defaultValue: 'false',
        group: 'style',
        validations: {
          in: [
            { displayName: 'True', value: 'true' },
            { displayName: 'False', value: 'false' },
          ],
        },
      },
      shadow: {
        description: 'Display a drop shadow under each product card',
        displayName: 'Shadow',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
      addtocart: {
        displayName: 'Show ATC Options',
        type: 'Boolean',
        group: 'style',
        defaultValue: true,
      },
      reviews: {
        displayName: 'Show Reviews',
        type: 'Boolean',
        group: 'style',
        defaultValue: true,
      },
    },
  },
};
