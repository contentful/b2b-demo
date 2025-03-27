'use client';
import { EditText } from '@/components/designSystem';
import { useAppContext, useEditMode } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { List } from '@material-tailwind/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import MenuItem from './menu-item';

export default function Menu(props: any): JSX.Element {
  const { editMode } = useEditMode();
  const {
    menuitems,
    direction = 'horizontal',
    menuicons = 'never',
    iconsize = 'h-5 w-5',
    fontSize = 'text-base',
    handleLinkClick = null,
  } = props;
  const { state } = useAppContext();
  const userroles = state.currentUserRoles;
  const pathname = usePathname();

  const flex = direction === 'horizontal' ? 'flex flex-row' : '';

  const userAllowed = (blockedRoles: string[]): boolean => {
    if (!blockedRoles) return true;

    const chances = userroles.length;
    let fails = 0;

    userroles.forEach((role) => {
      const fail = blockedRoles.includes(role);
      if (fail) fails = fails + 1;
    });

    return fails < chances;
  };

  return (
    <>
      {!menuitems && editMode ? (
        <EditText type='Menu' />
      ) : (
        <List className={`m-0 p-0 text-inherit w-fit ${flex}`}>
          {menuitems?.map((menuitem: any, key: number) => {
            const isActive = pathname === menuitem.href;
            return (
              <React.Fragment key={key}>
                {userAllowed(menuitem?.disallowedRoles) && (
                  <MenuItem
                    {...{
                      menuitem,
                      isActive,
                      menuicons,
                      iconsize,
                      fontSize,
                      handleLinkClick,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </>
  );
}

export const menuDefinition: ComponentDefinition = {
  id: 'menu',
  name: 'menu',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/1ASqROOjQh8PRDdb448OlP/3d32426db96db78991045573da2b1ba1/bars-solid.svg',
  tooltip: {
    description: 'Displays a navigation menu',
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
      defaultValue: 'h-4 w-4',
      validations: {
        in: [
          { displayName: 'xs (12x12)', value: 'h-2 w-2' },
          { displayName: 'sm (14x14)', value: 'h-3 w-3' },
          { displayName: 'default', value: 'h-4 w-4' },
          { displayName: 'lg (20x20)', value: 'h-5 w-5' },
          { displayName: 'xl (24x24)', value: 'h-6 w-6' },
          { displayName: '2xl (32x32)', value: 'h-8 w-8' },
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
};
