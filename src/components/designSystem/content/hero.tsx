import { EditText } from '@/components/designSystem';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero(props: any) {
  const {
    heading,
    description,
    ctaText,
    ctaURL,
    image,
    imageAlt,
    size,
    variant,
  } = props;
  const headingSize = size === 'sm' ? 'h3' : size === 'md' ? 'h2' : 'h1';

  return (
    <div className='hero w-full relative overflow-hidden'>
      {!(heading || description || ctaText || ctaURL || image) ? (
        <EditText type='Hero' />
      ) : (
        <>
          <div className='content container py-12 relative z-10'>
            <div className='w-1/2'>
              {heading && (
                <Typography
                  variant={headingSize}
                  placeholder='false'
                  color={variant}
                >
                  {heading}
                </Typography>
              )}
              <div className='rich-text'>
                {documentToReactComponents(description)}
              </div>
              <Link href={ctaURL ?? '/'} className='mt-4 block'>
                <Button size={size} placeholder='false' color={variant}>
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
          <div className='media absolute top-0 w-full'>
            <Image
              alt={imageAlt}
              className='h-auto object-cover w-full'
              height='0'
              sizes='100vw'
              src={`${image}?w=1300`}
              width='0'
            />
          </div>
        </>
      )}
    </div>
  );
}

export const heroDefinition: ComponentDefinition = {
  id: 'hero',
  name: 'Hero',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/7BAMY84bQmQAKj6i88nGsZ/05c3a892a1bfc517f82f7bf4ab7523eb/hero.svg',
  tooltip: {
    description:
      'This is a prescriptive hero made up of designs system elements.',
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
    heading: {
      displayName: 'Heading',
      type: 'Text',
    },
    description: {
      displayName: 'Description',
      type: 'RichText',
    },
    ctaText: {
      displayName: 'CTA Text',
      type: 'Text',
    },
    ctaURL: {
      displayName: 'CTA URL',
      type: 'Text',
    },
    image: {
      displayName: 'Background Image',
      type: 'Media',
      defaultValue:
        'https://images.ctfassets.net/tofsejyzyo24/5owPX1vp6cXDZr7QOabwzT/d5580f5b4dbad3f74c87ce2f03efa581/Image_container.png',
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
      defaultValue: 'lg',
      group: 'style',
    },
    variant: {
      displayName: 'Variant',
      type: 'Text',
      validations: {
        in: [
          { value: 'amber', displayName: 'Amber' },
          { value: 'black', displayName: 'Black' },
          { value: 'red', displayName: 'Red' },
          { value: 'white', displayName: 'White' },
        ],
      },
      defaultValue: 'black',
      group: 'style',
    },
  },
};
