'use client';

import { ICONS } from '@/components/designSystem';
import { useAppContext, useCartsContext, useSiteLabels } from '@/hooks';
import { UpdateCartEntriesProps } from '@/hooks/carts-context';
import { B2BCart, OrderEntry } from '@/models/commerce-types';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Option,
  Rating,
  Select,
  Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';

const QUANTITY_OPTIONS = [20, 50, 100];
const QUANTITY_MULTIPLIER = 5;

export default function ProductCard(props: any) {
  const { carts, dispatch, getCartByUser } = useCartsContext();
  const { state } = useAppContext();
  const { currentUser: guid, currentLocale: locale } = state;

  const [cart, setCart] = React.useState<B2BCart | undefined>();
  const [hasCart, setHasCart] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<string>(
    '' + QUANTITY_OPTIONS[0] * QUANTITY_MULTIPLIER
  );

  const { hideATCOption = false, variant } = props;
  // const product: Product = props.product;
  const productImageUrl: string | undefined = getSAPProductImageUrl(
    props.product
  );

  React.useEffect(() => {
    if (!guid) return;
    const userCart = getCartByUser(guid);
    if (userCart) {
      setCart(userCart);
      if (!hasCart) setHasCart(true);
    }
  }, [carts]);

  const handleAddEntry = () => {
    if (!cart) return;

    const newEntry: OrderEntry = {
      entryNumber: cart?.entries.length + 1,
      quantity: Number(quantity),
      basePrice: props.product.price,
      totalPrice: {
        value: props.product.price?.value * Number(quantity),
      },
      product: props.product,
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

    setShowModal(true);
  };

  const handleChangeQuantity = (value: string) => {
    setQuantity(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const productDetailsUrl = `/products/${
    props.product.code
  }/${decodeURIComponent(props.product.name)}`;

  const productCardProps = {
    ...props,
    hasCart,
    handleAddEntry,
    handleChangeQuantity,
    hideATCOption,
    productDetailsUrl,
    productImageUrl,
    quantity,
  };

  const atcModalProps = {
    product: props.product,
    quantity,
    locale,
    showModal,
    toggleModal,
  };

  return (
    <>
      {variant === 'card' ? (
        <ProductCardVertical {...productCardProps} />
      ) : (
        <ProductCardHorizontal {...productCardProps} />
      )}
      <ATCModal {...atcModalProps} />
    </>
  );
}

const ATCModal = (props: any): JSX.Element => {
  const { siteLabels } = useSiteLabels();
  const { product, quantity, locale, showModal, toggleModal } = props;

  const formattedTotalPrice = localizeCurrency(
    locale,
    product?.price?.value * Number(quantity)
  );

  return (
    <Dialog open={showModal} size='xs'>
      <DialogHeader className='justify-between py-2'>
        <Typography className='' variant='h6'>
          {siteLabels['message.addedToCart']}
        </Typography>
        <IconButton
          className='rounded-full'
          onClick={toggleModal}
          size='sm'
          variant='text'
        >
          <FontAwesomeIcon icon={ICONS['x']} />
        </IconButton>
      </DialogHeader>
      <DialogBody className='px-4 py-2'>
        <div className='flex flex-row gap-4 items-center justify-between'>
          <div className='h-32 w-32'>
            <img
              className='h-full object-contain  w-full'
              src={getSAPProductImageUrl(product)}
            />
          </div>
          <div className='flex flex-col flex-grow gap-0 justify-center h-32 px-3 w-40'>
            <div className='border-b flex gap-2 items-center mb-1 py-1'>
              <Typography
                className='font-bold m-0 text-normal'
                dangerouslySetInnerHTML={{
                  __html: product.name,
                }}
              />
              <Typography className='m-0 text-sm'>({product.code})</Typography>
            </div>
            <div className='flex gap-4 justify-between'>
              <Typography className='mb-0 text-sm'>
                {siteLabels['label.unitPrice']}
              </Typography>
              <Typography className='mb-0 text-sm'>
                {localizeCurrency(locale, product.price?.value)}
              </Typography>
            </div>
            <div className='flex gap-4 justify-between'>
              <Typography className='mb-0 text-sm'>
                {siteLabels['label.quantity']}
              </Typography>
              <Typography className='mb-0 text-sm'>{quantity}</Typography>
            </div>
            <div className='flex gap-4 justify-between'>
              <Typography className='mb-0 text-sm'>
                {siteLabels['label.total']}
              </Typography>
              <Typography className='mb-0 text-sm'>
                {formattedTotalPrice}
              </Typography>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

const ProductCardHorizontal = (props: any): JSX.Element => {
  const { state } = useAppContext();
  const locale = state.currentLocale;
  const { siteLabels } = useSiteLabels();

  const {
    border,
    handleAddEntry,
    handleChangeQuantity,
    hasCart,
    product,
    productDetailsUrl,
    productImageUrl,
    quantity,
    shadow,
    addtocart,
    reviews,
  } = props;

  return (
    <Card
      className={`${
        border ? 'border' : ''
      } grid grid-cols-12 grid-flow-row p-2 w-full`}
      key={product?.code}
      shadow={shadow ? true : false}
    >
      <CardHeader
        className='col-span-12 flex h-48 items-center justify-center md:col-span-3 m-0 p-2 w-full'
        floated={false}
        shadow={false}
      >
        <Link href={productDetailsUrl}>
          <img
            className='h-full max-h-44 object-contain w-full'
            src={productImageUrl}
          />
        </Link>
      </CardHeader>
      <CardBody className='flex flex-col col-span-12 items-start justify-between md:col-span-9 md:flex-row px-4 py-3 w-full'>
        <div classNam='flex flex-col items-center md:grow md:items-start w-full'>
          <Link href={productDetailsUrl}>
            <Typography
              as='h2'
              className='font-bold mb-1 text-blue-gray-800 text-base'
              dangerouslySetInnerHTML={{ __html: product?.name }}
            />
          </Link>
          <Typography
            className='font-normal m-0 p-0'
            dangerouslySetInnerHTML={{ __html: product?.summary }}
            variant='paragraph'
          />
          {reviews && (
            <div className='flex flex-col items-start justify-start mt-4 w-full'>
              <Rating readonly />
              <Typography className='font-normal m-0 p-0 text-center'>
                {siteLabels['message.noReviews']}
              </Typography>
            </div>
          )}
          <Typography className='font-semibold mb-0 mt-4 text-xl'>
            {localizeCurrency(locale, product?.price?.value)}
          </Typography>
        </div>
        {addtocart && (
          <div className='flex flex-col gap-2 items-end justify-between'>
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
              disabled={!hasCart}
              fullWidth={true}
              onClick={() => handleAddEntry(product, quantity)}
              size='lg'
            >
              {siteLabels['label.addToCart']}
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

const ProductCardVertical = (props: any): JSX.Element => {
  const { state } = useAppContext();
  const locale = state.currentLocale;
  const { siteLabels } = useSiteLabels();

  const {
    border,
    handleAddEntry,
    handleChangeQuantity,
    hasCart,
    product,
    productDetailsUrl,
    productImageUrl,
    quantity,
    shadow,
    addtocart,
    reviews,
  } = props;

  return (
    <Card
      className={`${
        border ? 'border' : ''
      } flex flex-col h-full overflow-hidden w-full`}
      shadow={shadow ? true : false}
    >
      <CardHeader
        className='h-1/2 m-0 p-2 w-full'
        floated={false}
        shadow={false}
      >
        <Link href={productDetailsUrl}>
          <img className='h-full object-contain w-full' src={productImageUrl} />
        </Link>
      </CardHeader>
      <CardBody className='flex flex-col grow py-2'>
        <Link href={productDetailsUrl}>
          <Typography
            className='font-bold m-0 p-0 text-base text-inherit text-center'
            dangerouslySetInnerHTML={{ __html: product?.name }}
          />
        </Link>
        {reviews && (
          <div className='flex flex-col items-center justify-center mt-2 w-full'>
            <Rating readonly />
            <Typography className='font-normal m-0 p-0 text-center'>
              {siteLabels['message.noReviews']}
            </Typography>
          </div>
        )}
      </CardBody>
      <CardFooter className='flex flex-col gap-3 pt-2 '>
        <Typography className='font-semibold m-0 p-0 text-center text-xl'>
          {localizeCurrency(locale, product?.price?.value)}
        </Typography>
        {addtocart && (
          <>
            <div className='mt-2 px-2 w-full'>
              <Select
                containerProps={{
                  className: 'min-w-min',
                }}
                label='Quantity'
                name='quantity'
                onChange={(value: string | undefined) =>
                  handleChangeQuantity(value)
                }
                size='md'
                value={quantity}
                variant='outlined'
              >
                {QUANTITY_OPTIONS.map((n: number, key: number) => {
                  return (
                    <Option
                      key={key}
                      className='w-20'
                      value={`${n * QUANTITY_MULTIPLIER}`}
                    >
                      {n * QUANTITY_MULTIPLIER}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className=' px-2 w-full'>
              <Button
                className='text-center px-2'
                disabled={!hasCart}
                fullWidth={true}
                onClick={() => handleAddEntry(product, quantity)}
                size='lg'
              >
                {siteLabels['label.addToCart']}
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
