'use client';

import { ICONS } from '@/components/designSystem';
import {
  UpdateCartEntriesProps,
  useAppContext,
  useCartsContext,
  useSiteLabels,
} from '@/hooks';
import { B2BCart, OrderEntry } from '@/models/commerce-types';
import { getSAPProductImageUrl } from '@/utils/image-utils';
import { localizeCurrency } from '@/utils/locale-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

export default function MiniCart() {
  const { carts, dispatch, getCartByUser, getNextCartCode } = useCartsContext();
  const { state } = useAppContext();
  const {
    currentUser: guid,
    currentLocale: locale,
    currentOrgUnit: orgUnit,
  } = state;
  const { siteLabels } = useSiteLabels();

  const [cart, setCart] = React.useState<B2BCart | undefined>();

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadUserCart = () => {
      const userCart = getCartByUser(state.currentUser);

      if (isMounted) {
        if (!userCart) {
          const createCartProps = { guid, orgUnit, locale };
          dispatch({
            type: 'ADD_CART',
            payload: createCartProps,
          });
        } else {
          setCart(userCart);
        }
      }
    };
    loadUserCart();

    return () => {
      isMounted = false;
    };
  }, [carts]);

  const handleRemoveEntry = (entryNumber: number) => {
    if (!cart) return;

    const payload: UpdateCartEntriesProps = {
      code: cart.code,
      locale,
      entries: cart.entries.filter(
        (entry: OrderEntry) => entry.entryNumber !== entryNumber
      ),
    };

    dispatch({
      type: 'UPDATE_ENTRIES',
      payload,
    });
  };

  return (
    <div className='h-10'>
      <Popover offset={4} placement='bottom-end'>
        <PopoverHandler>
          <div>
            {cart && cart?.entries && cart?.entries.length > 0 ? (
              <Badge content={cart.entries.length} placement='top-end'>
                <CartButton />
              </Badge>
            ) : (
              <CartButton />
            )}
          </div>
        </PopoverHandler>
        <PopoverContent className='min-w-36 w-max z-50'>
          <div className='flex flex-col gap-2 items-start'>
            {cart ? (
              <>
                <div className='border-b-2 flex gap-4 items-center justify-between py-2 uppercase w-full'>
                  <Typography className='font-bold m-0 text-sm'>
                    {siteLabels['label.newOrder']}:
                  </Typography>
                  <Typography className='font-bold m-0 text-sm'>
                    {cart.totalItems}{' '}
                    {cart.totalItems === 1
                      ? siteLabels['label.item']
                      : siteLabels['label.items']}
                  </Typography>
                </div>
                {cart.entries.map((entry: OrderEntry, key: number) => {
                  return (
                    <div
                      className={`${
                        key > 0 && 'border-t'
                      } flex gap-2 items-center justify-between text-blue-gray-800`}
                      key={entry.product?.code}
                    >
                      <div className='h-20 w-20'>
                        <img
                          className='h-full object-contain w-full'
                          src={getSAPProductImageUrl(entry.product)}
                        />
                      </div>
                      <div className='flex flex-col flex-grow gap-2 justify-center h-20 px-3 w-60'>
                        <Typography
                          className='font-bold mb-0 text-normal'
                          dangerouslySetInnerHTML={{
                            __html: entry.product?.name,
                          }}
                        />
                        <Typography className='mb-0 text-sm'>
                          {entry.quantity} @{' '}
                          {localizeCurrency(
                            locale,
                            entry.product?.price?.value
                          )}{' '}
                          {siteLabels['label.perUnit']}
                        </Typography>
                        <div className='flex gap-2 items-baseline'>
                          <Typography className='mb-0 text-sm'>
                            {siteLabels['label.total']}:
                          </Typography>
                          <Typography className='mb-0 text-sm'>
                            ${entry.totalPrice?.value.toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <IconButton
                          className='m-0 p-0 rounded-full'
                          onClick={() => handleRemoveEntry(entry.entryNumber)}
                          ripple={true}
                          size='sm'
                        >
                          <FontAwesomeIcon icon={ICONS['trash']} size='lg' />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
                {cart.entries.length > 0 && (
                  <div className='border-t-2 flex gap-4 items-center justify-between py-2 uppercase w-full'>
                    <Typography className='font-bold m-0 text-sm w-fit'>
                      {siteLabels['label.subtotal']}:
                    </Typography>
                    <Typography className='font-bold m-0 text-sm w-fit'>
                      {localizeCurrency(locale, cart.subTotal.value)}
                    </Typography>
                  </div>
                )}
                {/* <Button className='mt-3' fullWidth={true} onClick={toggleModal}>
                  show json
                </Button> */}
              </>
            ) : (
              <Typography className='font-bold m-0 text-normal uppercase'>
                {siteLabels['message.cartNotFound']}
              </Typography>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <Dialog open={showModal} handler={toggleModal} size='xxl'>
        <DialogHeader>
          <div className='flex items-center justify-between w-full'>
            <Typography className='m-0 p-0' variant='h4'>
              Cart JSON
            </Typography>
            <IconButton className='h-8 rounded-full w-8' onClick={toggleModal}>
              <FontAwesomeIcon icon={ICONS['x']} />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody>{JSON.stringify(cart)}</DialogBody>
      </Dialog>
    </div>
  );
}

const CartButton = () => {
  return (
    <IconButton className='rounded-full' color='white' ripple={true} size='md'>
      <FontAwesomeIcon icon={ICONS['dolly']} size='xl' />
    </IconButton>
  );
};
