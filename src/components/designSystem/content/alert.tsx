import {
  Icons,
  TailwindColors,
} from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Alert } from '@material-tailwind/react';

export const alertDefinition: ComponentDefinition = {
  component: Alert,
  definition: {
    id: 'alert',
    name: 'Alert',
    category: 'Elements',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: `Displays a short and important message attracting the user's attention without interrupting the user's task.`,
    },
    builtInStyles: ['cfPadding', 'cfMargin', 'cfWidth', 'cfMaxWidth'],
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
  },
};
