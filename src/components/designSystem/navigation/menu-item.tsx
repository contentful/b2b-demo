import ICONS from '@/components/designSystem/icons';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import Link from 'next/link';

export default function MenuItem(props: any) {
  const { menuitem, isActive, menuicons, iconsize, fontSize } = props;
  const { text, icon } = menuitem;

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
  console.log('MenuItemLabel :: icon ::', icon);

  return (
    <ListItem
      className={`flex gap-2 items-center ${
        isActive && 'underline'
      } ${fontSize} text-inherit whitespace-nowrap w-full`}
      color='inherit'
    >
      {menuicons === 'left' && (
        <ListItemPrefix className='text-inherit'>
          <img
            className={`object-contain ${iconsize}`}
            src={getContentfulImageUrl(icon)}
          />
        </ListItemPrefix>
      )}
      {menuicons === 'only' ? (
        <img
          className={`object-contain ${iconsize}`}
          src={getContentfulImageUrl(icon)}
        />
      ) : (
        text
      )}
      {menuicons === 'right' && (
        <ListItemSuffix className='ml-auto text-inherit'>
          <img
            className={`object-contain ${iconsize}`}
            src={getContentfulImageUrl(icon)}
          />
        </ListItemSuffix>
      )}
    </ListItem>
  );
};
