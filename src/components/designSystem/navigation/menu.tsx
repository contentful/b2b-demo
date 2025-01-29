import { EditText, ICONS } from '@/components/designSystem';
import { useAppContext } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Menu(props: any): JSX.Element {
  const preview = props.isInExpEditorMode;
  const {
    menuitems,
    direction = 'horizontal',
    submenus = 'never',
    menuicons = 'never',
    iconsize = 'lg',
    fontSize = 'text-base',
  } = props;
  const { state } = useAppContext();
  const userroles = state.currentUserRoles;
  const pathname = usePathname();

  const flex = direction === 'horizontal' ? 'flex flex-row' : '';

  return (
    <>
      {!menuitems && preview ? (
        <EditText type='Menu' />
      ) : (
        <List className={`m-0 p-0 text-inherit w-fit ${flex}`}>
          {menuitems?.map((menuitem: any, key: number) => {
            const isActive = pathname === menuitem.href;
            const isLink = menuitem.url;
            const canShow = userAllowed(userroles, menuitem?.disallowedRoles);
            return (
              <React.Fragment key={key}>
                {canShow &&
                  (isLink ? (
                    <LinkedMenuListItem
                      {...{ menuitem, isActive, menuicons, iconsize, fontSize }}
                    />
                  ) : (
                    <MenuListItem
                      {...{ menuitem, isActive, menuicons, iconsize, fontSize }}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </>
  );
}

export const menuDefinition: ComponentDefinition = {
  component: Menu,
  definition: {
    id: 'menu',
    name: 'menu',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Displays a navigation menu',
    },
    variables: {
      menuitems: {
        displayName: 'Menu Items',
        type: 'Array',
        group: 'content',
      },
      direction: {
        displayName: 'Direction',
        type: 'Text',
        group: 'style',
        defaultValue: 'horizontal',
        validations: {
          in: [
            { displayName: 'Horizontal', value: 'horizontal' },
            { displayName: 'Vertical', value: 'vertical' },
          ],
        },
      },
      submenus: {
        displayName: 'Display submenus',
        type: 'Text',
        group: 'style',
        defaultValue: 'never',
        validations: {
          in: [
            { displayName: 'as nested lists', value: 'nested' },
            { displayName: 'in dropdowns', value: 'dropdown' },
            { displayName: 'in mega menu', value: 'megamenu' },
            { displayName: 'never', value: 'never' },
          ],
        },
      },
      menuicons: {
        displayName: 'Display menu icons',
        type: 'Text',
        group: 'style',
        defaultValue: 'never',
        validations: {
          in: [
            { displayName: 'only', value: 'only' },
            { displayName: 'on left', value: 'left' },
            { displayName: 'on right', value: 'right' },
            { displayName: 'never', value: 'never' },
          ],
        },
      },
      iconsize: {
        displayName: 'Icons size',
        type: 'Text',
        group: 'style',
        defaultValue: '',
        validations: {
          in: [
            { displayName: 'xs (12x12)', value: 'xs' },
            { displayName: 'sm (14x14)', value: 'sm' },
            { displayName: 'default', value: '' },
            { displayName: 'lg (20x20)', value: 'lg' },
            { displayName: 'xl (24x24)', value: 'xl' },
            { displayName: '2xl (32x32)', value: '2xl' },
          ],
        },
      },
      fontSize: {
        displayName: 'Font Size',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: [
            { displayName: 'xs', value: 'text-xs' },
            { displayName: 'sm', value: 'text-sm' },
            { displayName: 'md', value: 'text-base' },
            { displayName: 'lg', value: 'text-lg' },
            { displayName: 'xl', value: 'text-xl' },
            { displayName: '2xl', value: 'text-2xl' },
          ],
        },
      },
    },
  },
};

const userAllowed = (userroles: string[], blockedRoles: string[]): boolean => {
  if (!blockedRoles) return true;

  const chances = userroles.length;
  let fails = 0;

  userroles.forEach((role) => {
    const fail = blockedRoles.includes(role);
    if (fail) fails = fails + 1;
  });

  return fails < chances;
};

const LinkedMenuListItem = (props: any) => {
  const { menuitem } = props;
  const { url } = menuitem;

  return (
    <Link className='text-inherit' href={url}>
      <MenuListItem {...props} />
    </Link>
  );
};

const MenuListItem = (props: any) => {
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
          <FontAwesomeIcon
            className='text-inherit'
            color='inherit'
            icon={ICONS[icon]}
            size={iconsize}
          />
        </ListItemPrefix>
      )}
      {menuicons === 'only' ? (
        <FontAwesomeIcon
          className='ml-auto text-inherit'
          color='inherit'
          icon={ICONS[icon]}
          size={iconsize}
        />
      ) : (
        text
      )}
      {menuicons === 'right' && (
        <ListItemSuffix className='ml-auto text-inherit'>
          <FontAwesomeIcon
            className='text-inherit'
            color='inherit'
            icon={ICONS[icon]}
            size={iconsize}
          />
        </ListItemSuffix>
      )}
    </ListItem>
  );
};
