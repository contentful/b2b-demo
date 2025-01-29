import { TailwindColors } from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Rating } from '@material-tailwind/react';

export default function CustomRating(props: any) {
  const { ratedColor, value = 0 } = props;
  return <Rating ratedColor={ratedColor} value={value} />;
}

export const ratingDefinition: ComponentDefinition = {
  component: CustomRating,
  definition: {
    id: 'rating',
    name: 'Rating',
    category: 'Elements',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'A star rating with a scale of 0 to 5.',
    },
    variables: {
      value: {
        displayName: 'Rating',
        type: 'Number',
        defaultValue: 0,
        validations: {
          in: [
            { displayName: '0', value: 0 },
            { displayName: '1', value: 1 },
            { displayName: '2', value: 2 },
            { displayName: '3', value: 3 },
            { displayName: '4', value: 4 },
            { displayName: '5', value: 5 },
          ],
        },
      },
      ratedColor: {
        displayName: 'Rated Color',
        type: 'Text',
        validations: {
          in: TailwindColors,
        },
        defaultValue: 'amber',
        group: 'style',
      },
      readOnly: {
        displayName: 'Readonly',
        type: 'Boolean',
        group: 'style',
        defaultValue: true,
      },
    },
  },
};
