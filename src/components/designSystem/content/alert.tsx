import {
  Icons,
  TailwindColors,
} from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';

export const alertDefinition: ComponentDefinition = {
  id: 'alert',
  name: 'Alert',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/3f1YxuUm4hSY0DdExuhJMN/936522a8865031e17165ead707e430ae/circle-exclamation-solid.svg',
  tooltip: {
    description: `Displays a short and important message attracting the user's attention without interrupting the user's task.`,
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
    children: {
      displayName: 'Text',
      type: 'Text',
      defaultValue: 'Add your text here ...',
    },
    variant: {
      displayName: 'Variant',
      type: 'Text',
      validations: {
        in: [
          { value: '', displayName: 'Basic' },
          { value: 'gradient', displayName: 'Gradient' },
          { value: 'outlined', displayName: 'Outlined' },
          { value: 'ghost', displayName: 'Ghost' },
        ],
      },
      group: 'style',
    },
    color: {
      displayName: 'Color',
      type: 'Text',
      validations: {
        in: TailwindColors,
      },
      defaultValue: 'amber',
      group: 'style',
    },
    className: {
      displayName: 'Classes',
      type: 'Text',
      group: 'style',
    },
    icon: {
      displayName: 'Icon',
      type: 'Object',
      validations: {
        in: Icons,
      },
      group: 'style',
    },
  },
};
