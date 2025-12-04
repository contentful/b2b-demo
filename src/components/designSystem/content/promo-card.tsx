'use client';
import { EditText } from '@/components/designSystem';
import { useEditMode } from '@/hooks';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Icon from './icon';

export default function PromoCard(props: any) {
  const { editMode } = useEditMode();

  const {
    title,
    summary,
    description,
    ctaText,
    ctaURL,
    image,
    openInNewWindow,
  } = props;

  const isDefined = () => {
    return (
      typeof title === 'string' ||
      typeof summary === 'string' ||
      typeof description === 'object' ||
      typeof ctaText === 'string' ||
      typeof ctaURL === 'string' ||
      typeof image === 'string'
    );
  };

  return (
    <>
      {!isDefined() ? (
        editMode && <EditText type='Promo Card' />
      ) : ctaURL ? (
        <Link
          href={ctaURL || '#'}
          target={openInNewWindow ? '_blank' : '_self'}
        >
          <PromoCardCard {...props} />
        </Link>
      ) : (
        <PromoCardCard {...props} />
      )}
    </>
  );
}

export const promoCardDefinition: ComponentDefinition = {
  id: 'promo-card',
  name: 'Promo Card',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/6VeodakTF7O1tFyUe0wYx/68c6a00726e76ff4786caa56b5a8fed2/promo_card.svg',
  tooltip: {
    description: 'Card for displaying a promotion',
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
    title: {
      displayName: 'Title',
      type: 'Text',
    },
    summary: {
      displayName: 'Summary',
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
    openInNewWindow: {
      displayName: 'OpenInNewWindow',
      type: 'Boolean',
      group: 'content',
      defaultValue: false,
    },
    image: {
      displayName: 'Image',
      type: 'Media',
    },
  },
};

const PromoCardCard = (props: any): React.JSX.Element => {
  const {
    title,
    summary,
    description,
    ctaText,
    ctaURL,
    image,
    border,
    shadow,
  } = props;

  return (
    <Card
      shadow={shadow}
      className='bg-inherit overflow-hidden rounded-none text-inherit w-full'
    >
      {image && (
        <CardHeader
          floated={false}
          shadow={false}
          color='transparent'
          className='bg-inherit m-0 text-inherit w-full rounded-none'
        >
          {image && (
            <Image
              alt={title}
              className={`h-full object-cover w-full`}
              height='0'
              sizes='100vw'
              src={getContentfulImageUrl(image)!}
              width='0'
            />
          )}
        </CardHeader>
      )}
      <CardBody className='bg-inherit text-inherit w-full'>
        {title && (
          <Typography className='text-inherit' variant='h4' color='blue-gray'>
            {title}
          </Typography>
        )}
        {summary && (
          <Typography
            as='div'
            variant='lead'
            color='gray'
            className='font-normal mt-3 text-inherit'
          >
            {summary}
          </Typography>
        )}
        {description && (
          <Typography
            as='div'
            variant='lead'
            color='gray'
            className='font-normal mt-3 text-inherit'
          >
            {documentToReactComponents(description)}
          </Typography>
        )}
      </CardBody>
      {ctaText && ctaURL && (
        <CardFooter className='bg-inherit flex items-center justify-between p-4 text-inherit w-full'>
          <div className='flex gap-2 items-center -space-x-3'>
            {ctaText && (
              <Button className='flex items-center gap-2 px-3' variant='text'>
                <Typography className='m-0 text-inherit'>{ctaText}</Typography>
                <Icon prefix='fas' iconName='arrow-right' size='lg' />
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
