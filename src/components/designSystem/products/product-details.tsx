'use client';
import { Icon, Rating } from '@/components/designSystem';
import {
  UpdateCartEntriesProps,
  useAppContext,
  useCartsContext,
  useEditMode,
  useSiteLabels,
} from '@/hooks';
import { B2BCart, OrderEntry, Product } from '@/models/commerce-types';
import { getProduct } from '@/services/sap/products';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Alert,
  Button,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const QUANTITY_OPTIONS = [20, 50, 100];
const QUANTITY_MULTIPLIER = 5;

export default function ProductDetails(props: any) {
  const { editMode } = useEditMode();

  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const { carts, dispatch, getCartByUser } = useCartsContext();

  const pathname = usePathname();

  const { currentUser: guid, currentLocale: locale } = state;

  const [cart, setCart] = React.useState<B2BCart | null>();
  const [error, setError] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Product>();
  const [showAlert, setShowAlert] = React.useState<boolean>();
  const [quantity, setQuantity] = React.useState<string>(
    '' + QUANTITY_OPTIONS[0] * QUANTITY_MULTIPLIER
  );

  React.useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      const locale = state.currentLocale;
      if (pathname) {
        const pathNodes = pathname.substring(1).split('/');
        if (pathNodes[0] === 'products') {
          const code = pathNodes[1];

          await getProduct({ code, locale })
            .then((result) => {
              if (isMounted) {
                setProduct(result);
              }
            })
            .catch((error: any) => {
              console.error(error);
              setError(error);
            });
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [pathname, state]);

  React.useEffect(() => {
    if (!guid) return;
    const userCart = getCartByUser(guid);
    if (userCart) {
      setCart(userCart);
    }
  }, [carts, guid, getCartByUser]);

  const handleAddEntry = (): void => {
    if (!cart || !product) return;

    const newEntry: OrderEntry = {
      entryNumber: cart?.entries.length + 1,
      quantity: Number(quantity),
      basePrice: product.price,
      totalPrice: {
        value: product.price?.value * Number(quantity),
      },
      product,
    };

    const payload: UpdateCartEntriesProps = {
      code: cart.code,
      entries: [...cart.entries, newEntry],
      locale,
    };

    dispatch({
      type: 'UPDATE_ENTRIES',
      payload,
    });
  };

  const handleChangeQuantity = (value: string | undefined): void => {
    if (!value) return;
    setQuantity(value);
  };

  return (
    <>
      {!product && !error && editMode && (
        <div className='flex flex-col items-center justify-start max-w-screen-xl mx-auto p-4 w-full'>
          <Typography className='mb-4' variant='h5'>
            Product Details Component
          </Typography>
          <Typography className='font-normal text-base'>
            Product details will be dynamically displayed based on the pathname.
          </Typography>
        </div>
      )}
      {error && (
        <Alert
          color='red'
          icon={
            <Icon
              className='flex flex-wrap gap-2'
              iconName='exclamation-circle'
              prefix='fas'
              size='xl'
            />
          }
          onClose={() => setShowAlert(false)}
          open={showAlert}
        >
          {siteLabels['message.sapServiceError']}
          {error.message}
        </Alert>
      )}
      {product && (
        <div className='flex flex-col gap-5 p-4 w-full'>
          <div className='flex flex-col gap-4 items-center justify-start max-w-screen-xl sm:flex-row sm:items-start w-full'>
            <div className='flex h-full items-center justify-center sm:w-1/2 w-full'>
              {product.images && (
                <Image
                  alt='product image'
                  className='h-full max-h-[32rem] object-contain w-full'
                  height='0'
                  sizes='36rem'
                  src={getSAPProductImageUrl(product)!}
                  width='0'
                />
              )}
            </div>
            <div className='flex flex-col items-start justify-center pt-8 sm:grow sm:w-1/2 w-full'>
              <Typography
                className='font-normal text-inherit text-3xl'
                color='inherit'
                variant='h1'
              >
                {product.name}
              </Typography>

              <Typography className='font-normal text-inherit' color='inherit'>
                {product.code}
              </Typography>

              <div className='flex flex-col items-start justify-start mt-2 w-fit'>
                <Rating readonly />
                <Typography
                  className='font-normal mt-2 text-inherit'
                  color='inherit'
                >
                  {siteLabels['message.noReviews']}
                </Typography>
              </div>
              <Typography
                className='font-semibold text-inherit text-2xl'
                color='inherit'
              >
                {localizeCurrency(locale, product?.price?.value)}
              </Typography>
              {(product.description || product.summary) && (
                <Accordion className='text-inherit mt-2 w-full' open={open}>
                  <AccordionHeader
                    className='border-none flex gap-14 items-center justify-start text-inherit py-0'
                    onClick={() => setOpen(!open)}
                  >
                    <Typography
                      className='font-semibold m-0 p-0 text-inherit'
                      color='inherit'
                    >
                      {siteLabels['label.productDetails']}
                    </Typography>
                    <Icon
                      prefix='fas'
                      iconName={open ? 'angle-up' : 'angle-down'}
                      size='xs'
                    />
                  </AccordionHeader>
                  <AccordionBody className='bg-gray-200 px-2 text-inherit w-full'>
                    {product?.summary && (
                      <div
                        className='font-normal text-inherit'
                        dangerouslySetInnerHTML={{ __html: product?.summary }}
                      />
                    )}
                    {product?.description && (
                      <div
                        className='font-normal text-inherit'
                        dangerouslySetInnerHTML={{
                          __html: product?.description!,
                        }}
                      />
                    )}
                  </AccordionBody>
                </Accordion>
              )}
              {cart && (
                <div className='flex flex-col gap-4 items-end justify-between mt-5'>
                  <Select
                    label='Quantity'
                    name='quantity'
                    onChange={(value: string | undefined) =>
                      handleChangeQuantity(value)
                    }
                    value={quantity}
                  >
                    {QUANTITY_OPTIONS.map((n: number) => {
                      return (
                        <Option key={n} value={`${n * QUANTITY_MULTIPLIER}`}>
                          {n * QUANTITY_MULTIPLIER}
                        </Option>
                      );
                    })}
                  </Select>
                  <Button
                    className='text-center'
                    disabled={!cart}
                    fullWidth={true}
                    onClick={handleAddEntry}
                    size='lg'
                  >
                    {siteLabels['label.addToCart']}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const productDetailsDefinition: ComponentDefinition = {
  id: 'product-details',
  name: 'Product Details',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/3yGAwQl7U77wNZbKid1dtN/d6a149f76d150be6b9ec243ce937f8ad/product.svg',
  tooltip: {
    description: 'display the details of a given product',
  },
  builtInStyles: [
    'cfBackgroundColor',
    'cfBorder',
    'cfBorderRadius',
    'cfFontSize',
    'cfLetterSpacing',
    'cfLineHeight',
    'cfMargin',
    'cfMaxWidth',
    'cfPadding',
    'cfTextAlign',
    'cfTextColor',
    'cfTextTransform',
    'cfWidth',
  ],
  variables: {},
};
