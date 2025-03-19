'use client';
import {
  UpdateCartEntriesProps,
  useAppContext,
  useCartsContext,
  useEditMode,
  useSiteLabels,
} from '@/hooks';
import { getOrders } from '@/mocks';
import { OrderEntry } from '@/models/commerce-types';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const QUANTITY_OPTIONS = [5, 10, 15, 20];
const QUANTITY_MULTIPLIER = 5;

export default function QuickOrderModal(props: any) {
  const { editMode } = useEditMode();
  const { showQuickOrder, toggleModal } = props;

  const { state } = useAppContext();
  const { currentLocale: locale, currentUser: guid } = state;
  const { siteLabels } = useSiteLabels();
  const { carts, dispatch, getCartByUser } = useCartsContext();

  const [cart, setCart] = React.useState<any>();
  const [hasCart, setHasCart] = React.useState(false);
  const [order, setOrder] = React.useState<any>();

  React.useEffect(() => {
    let isMounted = true;
    if (!guid) return;

    const getUserCartAndLastOrder = async () => {
      if (isMounted) {
        const userCart = getCartByUser(guid);
        if (userCart) {
          const userOrders = await getOrders('guid', guid);
          if (userOrders) {
            setOrder(userOrders[0]);
          }
          setCart(userCart);
          if (!hasCart) setHasCart(true);
        }
      }
    };

    getUserCartAndLastOrder();

    return () => {
      isMounted = false;
    };
  }, [carts, guid, getCartByUser, hasCart]);

  const handleAddAll = () => {
    if (!cart) return;

    const newEntries = order.entries.map((entry: OrderEntry, key: number) => {
      return {
        entryNumber: key + 1,
        quantity: entry.quantity,
        basePrice: entry.basePrice,
        totalPrice: entry.totalPrice,
        product: entry.product,
      };
    });

    const payload: UpdateCartEntriesProps = {
      code: cart.code,
      entries: [...cart.entries, ...newEntries],
      locale,
    };

    dispatch({
      type: 'UPDATE_ENTRIES',
      payload,
    });

    toggleModal();
  };

  const handleAddEntry = (product: any, quantity: number) => {
    if (!cart) return;

    const newEntry: OrderEntry = {
      entryNumber: cart?.entries.length + 1,
      quantity: Number(quantity),
      basePrice: product.price,
      totalPrice: {
        value: product.price?.value * Number(quantity),
      },
      product: product,
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

  const productCardProps = {
    handleAddEntry,
    hasCart,
  };

  return (
    <Dialog open={showQuickOrder} handler={toggleModal} size='md'>
      <DialogHeader className=''>{siteLabels['label.quickOrder']}</DialogHeader>
      <DialogBody className='border-b border-t border-gray-300 max-h-80 overflow-y-auto'>
        {!order ? (
          editMode ? (
            <div>Quick Order requires a logged in user account</div>
          ) : (
            <div>No previous order found for quick order.</div>
          )
        ) : (
          order.entries.map((entry: any) => {
            return (
              <QuickOrderItem
                key={entry.entryNumber}
                product={entry.product}
                quantity={'' + entry.quantity}
                {...productCardProps}
              />
            );
          })
        )}
      </DialogBody>
      <DialogFooter className='flex gap-2 items-center justify-end w-full'>
        <Button onClick={toggleModal} size='sm' variant='text'>
          {siteLabels['label.close']}
        </Button>
        <Button onClick={handleAddAll} size='sm' variant='filled'>
          {siteLabels['label.addAllToOrder']}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

const QuickOrderItem = (props: any): JSX.Element => {
  const { handleAddEntry, hasCart, product } = props;
  const { state } = useAppContext();
  const locale = state.currentLocale;
  const { siteLabels } = useSiteLabels();

  const productImageUrl = getSAPProductImageUrl(product);
  const productDetailsUrl = `/products/${product.code}/${decodeURIComponent(
    product.name
  )}`;

  const [quantity, setQuantity] = React.useState<string>(props.quantity);

  const handleChangeQuantity = (value: string | undefined) => {
    if (!value) return;
    setQuantity(value);
  };

  return (
    <div className='even:bg-gray-200 flex items-center justify-start w-full'>
      <div className='h-16 items-center justify-center m-0 p-0 w-1/6'>
        <Image
          alt={product.code}
          className='h-full max-h-20 object-contain w-full'
          height='128'
          src={productImageUrl!}
          width='128'
        />
      </div>
      <div className='flex flex-col items-start justify-start p-2 w-2/6'>
        <Link href={productDetailsUrl}>
          <div
            className='font-bold text-inherit text-sm w-full'
            dangerouslySetInnerHTML={{ __html: product?.name }}
          />
        </Link>
        <Typography as='div' className='font-normal text-inherit text-[.75rem]'>
          {product.code}
        </Typography>
        <Typography as='div' className='font-semibold m-0 text-inherit text-sm'>
          {localizeCurrency(locale, product?.price?.value)}
        </Typography>
      </div>
      <div className='flex gap-2 items-center justify-end p-2 w-3/6'>
        <Select
          className='min-w-[4rem] w-full'
          containerProps={{ className: 'min-w-[3rem] w-[5rem]' }}
          label='Quantity'
          name='quantity'
          onChange={(value: string | undefined) => handleChangeQuantity(value)}
          value={quantity}
          size='md'
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
          className='rounded-md text-center'
          disabled={!hasCart}
          fullWidth={false}
          onClick={() => handleAddEntry(product, quantity)}
          size='md'
        >
          {siteLabels['label.addToOrder']}
        </Button>
      </div>
    </div>
  );
};
