import { getContentfulImageUrl } from '@/utils/image-utils';
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuItem(props: any) {
  const { menuitem, isActive, menuicons, iconsize, fontSize } = props;

  return menuitem.url ? (
    <Link className='text-inherit' href={menuitem.url}>
      <MenuItemLabel
        {...{ menuitem, isActive, menuicons, iconsize, fontSize }}
      />
    </Link>
  ) : (
    <MenuItemLabel {...{ menuitem, isActive, menuicons, iconsize, fontSize }} />
  );
}

const MenuItemLabel = (props: any) => {
  const { menuitem, isActive, menuicons, iconsize, fontSize } = props;
  const { text, icon } = menuitem;

  return (
    <ListItem
      className={`flex gap-2 items-center ${
        isActive && 'underline'
      } ${fontSize} text-inherit whitespace-nowrap w-full`}
      color='inherit'
    >
      {menuicons === 'left' && (
        <ListItemPrefix className='text-inherit'>
          <Image
            alt='icon'
            className={`object-contain ${iconsize}`}
            height='56'
            src={getContentfulImageUrl(icon)!}
            width='56'
          />
        </ListItemPrefix>
      )}
      {menuicons === 'only' ? (
        <Image
          alt='icon'
          className={`object-contain ${iconsize}`}
          height='56'
          src={getContentfulImageUrl(icon)!}
          width='56'
        />
      ) : (
        text
      )}
      {menuicons === 'right' && (
        <ListItemSuffix className='ml-auto text-inherit'>
          <Image
            alt='icon'
            className={`object-contain ${iconsize}`}
            height='56'
            src={getContentfulImageUrl(icon)!}
            width='56'
          />
        </ListItemSuffix>
      )}
    </ListItem>
  );
};
