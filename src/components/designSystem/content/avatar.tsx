import { ComponentDefinition } from '@contentful/experiences-sdk-react';

export const avatarDefinition: ComponentDefinition = {
  id: 'avatar',
  name: 'Avatar',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/76GucUSCMZvTlrJW44jJvf/1febf72a3ecda078a7423b55213cff6b/circle-user-regular.svg',
  tooltip: {
    description: `Displays a user avatar.`,
  },
  builtInStyles: [
    'cfBackgroundColor',
    'cfBorder',
    'cfBorderRadius',
    'cfMargin',
    'cfMaxWidth',
    'cfPadding',
    'cfWidth',
  ],
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
};
