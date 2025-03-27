import { TailwindColors } from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Button as MTButton } from '@material-tailwind/react';
import Link from 'next/link';

export default function Button(props: any) {
  const { url, value, ...buttonProps } = props;

  return (
    <Link href={url}>
      <MTButton {...buttonProps} placeholder=''>
        {value}
      </MTButton>
    </Link>
  );
}

export const buttonDefinition: ComponentDefinition = {
  id: 'button',
  name: 'Button',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/CZAJK1QcIjZMZ0e4GV5gC/59db38777e8bbdf8014ce38662cb11b0/circle-play-solid.svg',
  // thumbnailUrl:
  //   'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
  tooltip: {
    description: 'This is a custom button created for our design system.',
  },
  builtInStyles: [
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
    value: {
      displayName: 'Text',
      type: 'Text',
      defaultValue: 'Button',
    },
    url: {
      displayName: 'URL',
      type: 'Text',
      defaultValue: '/',
    },
    variant: {
      displayName: 'Variant',
      type: 'Text',
      validations: {
        in: [
          { value: 'filled', displayName: 'Filled' },
          { value: 'outlined', displayName: 'Outlined' },
          { value: 'gradient', displayName: 'Gradient' },
          { value: 'text', displayName: 'Text' },
        ],
      },
      defaultValue: 'filled',
      group: 'style',
    },
    color: {
      displayName: 'Color',
      type: 'Text',
      validations: {
        in: TailwindColors,
      },
      defaultValue: 'inherit',
      group: 'style',
    },
    size: {
      displayName: 'Size',
      type: 'Text',
      validations: {
        in: [
          { value: 'sm', displayName: 'Small' },
          { value: 'md', displayName: 'Medium' },
          { value: 'lg', displayName: 'Large' },
        ],
      },
      defaultValue: 'md',
      group: 'style',
    },
  },
};
