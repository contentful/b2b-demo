import { HeadingFormats } from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Typography } from '@material-tailwind/react';

export default function Heading({
  children,
  variant = 'h2',
}: any): JSX.Element {
  return (
    <Typography className='m-0 p-0' {...{ color: 'inherit', variant }}>
      {children}
    </Typography>
  );
}

export const headingDefinition: ComponentDefinition = {
  id: 'heading',
  name: 'Heading',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/7avJgWeSnC7GY7uK28Sqcz/ed70e092856d9a5c92cbe28fe342752b/heading-solid.svg',
  tooltip: {
    description: 'This is a custom heading created for our design system.',
  },
  builtInStyles: [
    'cfMargin',
    'cfPadding',
    'cfWidth',
    'cfMaxWidth',
    'cfTextAlign',
    'cfTextColor',
  ],
  variables: {
    children: {
      displayName: 'Text',
      type: 'Text',
      defaultValue: 'Heading',
    },
    variant: {
      displayName: 'Variant',
      type: 'Text',
      validations: {
        in: HeadingFormats,
      },
      defaultValue: 'h2',
      group: 'style',
    },
  },
};
