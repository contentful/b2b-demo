import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditText from '../shared/edit-text';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useEditMode } from '@/hooks';

library.add(fab, far, fas);

export default function Icon(props: any) {
  const {
    className,
    color,
    prefix,
    iconName,
    link,
    animation,
    flip,
    rotation,
    size,
  } = props;

  const { editMode } = useEditMode();

  const icon = findIconDefinition({
    prefix,
    iconName,
  });

  const FAIcon = () => {
    return (
      <FontAwesomeIcon
        className={className}
        color={color}
        icon={icon}
        size={size}
        flip={flip}
        pulse={animation === 'pulse'}
        rotation={rotation}
        spin={animation === 'spin'}
      />
    );
  };

  return (
    <>
      {!icon ? (
        editMode && <EditText type='Font Awesome Icon' />
      ) : link ? (
        <Link href={link}>
          <FAIcon />
        </Link>
      ) : (
        <FAIcon />
      )}
    </>
  );
}

export const iconDefinition: ComponentDefinition = {
  id: 'icon',
  name: 'Font Awesome Icon',
  category: 'Elements',
  thumbnailUrl:
    'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
  tooltip: {
    description: 'Renders a Font Awesome Icon',
  },
  builtInStyles: [
    'cfBackgroundColor',
    'cfBorder',
    'cfBorderRadius',
    'cfFontSize',
    'cfMargin',
    'cfMaxWidth',
    'cfPadding',
    'cfTextColor',
    'cfWidth',
  ],
  variables: {
    prefix: {
      displayName: 'Icon Package',
      type: 'Text',
      group: 'content',
      defaultValue: 'fas',
      validations: {
        in: [
          { displayName: 'brands', value: 'fab' },
          { displayName: 'regular', value: 'far' },
          { displayName: 'solid', value: 'fas' },
        ],
      },
    },
    iconName: {
      displayName: 'Icon Name',
      type: 'Text',
      group: 'content',
    },
    link: {
      displayName: 'Link',
      type: 'Text',
      group: 'content',
    },
    animation: {
      displayName: 'Animation',
      type: 'Text',
      group: 'style',
      defaultValue: '',
      validations: {
        in: [
          { displayName: 'none', value: '' },
          { displayName: 'pulse', value: 'pulse' },
          { displayName: 'spin', value: 'spin' },
        ],
      },
    },
    flip: {
      displayName: 'Flip',
      type: 'Text',
      group: 'style',
      defaultValue: '',
      validations: {
        in: [
          { displayName: 'none', value: '' },
          { displayName: 'horizontal', value: 'horizontal' },
          { displayName: 'vertical', value: 'vertical' },
          { displayName: 'both', value: 'both' },
        ],
      },
    },
    rotation: {
      displayName: 'Rotation',
      type: 'Number',
      group: 'style',
      defaultValue: 0,
    },
    size: {
      displayName: 'Size',
      type: 'Text',
      group: 'style',
      defaultValue: '1x',
      validations: {
        in: [
          { displayName: '2xs', value: '2xs' },
          { displayName: 'xs', value: 'xs' },
          { displayName: 'sm', value: 'sm' },
          { displayName: 'lg', value: 'lg' },
          { displayName: 'xl', value: 'xl' },
          { displayName: '2xl', value: '2xl' },
          { displayName: '1x', value: '1x' },
          { displayName: '2x', value: '2x' },
          { displayName: '3x', value: '3x' },
          { displayName: '4x', value: '4x' },
          { displayName: '5x', value: '5x' },
          { displayName: '6x', value: '6x' },
          { displayName: '7x', value: '7x' },
          { displayName: '8x', value: '8x' },
          { displayName: '9x', value: '9x' },
          { displayName: '10x', value: '10x' },
        ],
      },
    },
  },
};
