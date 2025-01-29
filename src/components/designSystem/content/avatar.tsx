import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Avatar } from '@material-tailwind/react';

export const avatarDefinition: ComponentDefinition = {
  component: Avatar,
  definition: {
    id: 'avatar',
    name: 'Avatar',
    category: 'Elements',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: `Displays a user avatar.`,
    },
    variables: {
      src: {
        displayName: 'Source',
        type: 'Media',
      },
      variant: {
        displayName: 'Variant',
        type: 'Text',
        validations: {
          in: [
            { value: '', displayName: 'Circular' },
            { value: 'rounded', displayName: 'Rounded' },
            { value: 'square', displayName: 'Square' },
          ],
        },
        group: 'style',
      },
      size: {
        displayName: 'Size',
        type: 'Text',
        validations: {
          in: [
            { value: 'xs', displayName: 'XS' },
            { value: 'sm', displayName: 'SM' },
            { value: 'md', displayName: 'MD' },
            { value: 'lg', displayName: 'LG' },
            { value: 'xl', displayName: 'XL' },
            { value: 'xxl', displayName: 'XXL' },
          ],
        },
        defaultValue: 'lg',
        group: 'style',
      },
      withBorder: {
        displayName: 'Border',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
    },
  },
};
