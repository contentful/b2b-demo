import { getContentfulImageUrl } from '@/utils/image-utils';
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuItem(props: any) {
  const {
    menuitem,
    isActive,
    menuicons,
    iconsize,
    fontSize,
    handleLinkClick = false,
  } = props;

  return menuitem?.url ? (
    handleLinkClick ? (
      <MenuItemLabel
        {...{
          menuitem,
          isActive,
          menuicons,
          iconsize,
          fontSize,
          handleLinkClick,
        }}
      />
    ) : (
      <Link
        href={menuitem.url}
        target={menuitem.openInNewWindow ? '_blank' : '_self'}
      >
        <MenuItemLabel
          {...{ menuitem, isActive, menuicons, iconsize, fontSize }}
        />
      </Link>
    )
  ) : (
    <MenuItemLabel {...{ menuitem, isActive, menuicons, iconsize, fontSize }} />
  );
}

const MenuItemLabel = (props: any) => {
  const {
    menuitem,
    isActive,
    menuicons,
    iconsize,
    fontSize,
    handleLinkClick = false,
  } = props;
  const text = menuitem?.text;
  const icon = menuitem?.icon;

  return (
    <ListItem
      className={`flex gap-2 items-center ${
        isActive && 'underline'
      } ${fontSize} text-inherit whitespace-nowrap w-full`}
      color='inherit'
      onClick={() => handleLinkClick && handleLinkClick(menuitem.url)}
      ripple={false}
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
