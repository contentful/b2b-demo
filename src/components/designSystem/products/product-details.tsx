import { ICONS } from '@/components/designSystem';
import {
  UpdateCartEntriesProps,
  useAppContext,
  useCartsContext,
  useSiteLabels,
} from '@/hooks';
import { B2BCart, OrderEntry, Product } from '@/models/commerce-types';
import { getProduct } from '@/services/sap/products';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Option,
  Rating,
  Select,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const QUANTITY_OPTIONS = [20, 50, 100];
const QUANTITY_MULTIPLIER = 5;

export default function ProductDetails(props: any) {
  const preview = props.isInExpEditorMode;

  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const { carts, dispatch, getCartByUser } = useCartsContext();

  const pathname = usePathname();

  const { currentUser: guid, currentLocale: locale } = state;

  const [cart, setCart] = React.useState<B2BCart | undefined>();
  const [error, setError] = React.useState<any>();
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

  const handleAddEntry = () => {
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

  const handleChangeQuantity = (value: string | undefined) => {
    if (!value) return;
    setQuantity(value);
  };

  return (
    <>
      {!product && !error && preview && (
        <div className='border flex flex-col items-center justify-start max-w-screen-xl mx-auto my-5 p-4 w-full'>
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
            <FontAwesomeIcon
              className='flex flex-wrap gap-2'
              icon={ICONS['exclamation-circle']}
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
        <>
          <div className='flex flex-col gap-4 items-center justify-start max-w-screen-xl sm:flex-row sm:items-start w-full'>
            <div className='flex h-full items-center justify-center sm:w-1/2 w-full'>
              {product.images && (
                <Image
                  alt='product image'
                  className='h-full max-h-[32rem] object-contain w-full'
                  height='768'
                  src={getSAPProductImageUrl(product)!}
                  width='768'
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
              {product.summary && (
                <div
                  className='font-normal text-inherit'
                  color='inherit'
                  dangerouslySetInnerHTML={{ __html: product?.summary }}
                />
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
                    className='rounded-full text-center'
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
          {product.description && (
            <div className='flex flex-col items-start justify-start mt-32 w-full'>
              <Typography
                className='text-inherit w-full'
                color='inherit'
                variant='h3'
              >
                {siteLabels['label.productDetails']}
              </Typography>
              <div
                className='bg-gray-100 border-t m-0 p-4 text-inherit w-full'
                dangerouslySetInnerHTML={{ __html: product.description! }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export const productDetailsDefinition: ComponentDefinition = {
  component: ProductDetails,
  definition: {
    id: 'product-details',
    name: 'Product Details',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'display the details of a given product',
    },
    variables: {},
  },
};
