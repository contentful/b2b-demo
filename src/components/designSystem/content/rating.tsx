import { TailwindColors } from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import Icon from './icon';

const stars = [1, 2, 3, 4, 5];

export default function Rating(props: any) {
  const { ratedColor, value = 0 } = props;
  return (
    <div style={{ color: ratedColor }}>
      {stars.map((i: number) => {
        return (
          <Icon
            key={i}
            prefix={i <= value ? 'fas' : 'far'}
            iconName='star'
            size='sm'
          />
        );
      })}
    </div>
  );
}

export const ratingDefinition: ComponentDefinition = {
  id: 'rating',
  name: 'Rating',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/1WOYb0DAM5s5yFQXg9EO8i/f76d176f90d7a09c519c30bcf21a8758/star-half-stroke-solid.svg',
  tooltip: {
    description: 'A star rating with a scale of 0 to 5.',
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
};
