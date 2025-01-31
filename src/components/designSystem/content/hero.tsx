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
              src={`${image}?w=1300`}
              alt={imageAlt}
              className='object-fit w-full'
              width='1920'
              height='1080'
            />
          </div>
        </>
      )}
    </div>
  );
}

export const heroDefinition: ComponentDefinition = {
  component: Hero,
  definition: {
    // This id is the same as the "basic" component that default experiences have
    // This is how we override the default button component
    id: 'hero',
    name: 'Hero',
    // This is the category that the component will be placed in the sidebar
    category: 'Components',
    // This is the thumbnail that will be shown in the sidebar
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    // This is the tooltip that will be shown when hovering over the component in the sidebar
    tooltip: {
      description:
        'This is a prescriptive hero made up of designs system elements.',
      // there is also an option to include an image in the tooltip
    },
    // These are the variables that can be set for the component
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
  },
};
