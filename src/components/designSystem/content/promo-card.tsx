import { EditText, ICONS } from '@/components/designSystem';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default function PromoCard(props: any) {
  const preview = props.isInExpEditorMode;
  console.log('PromoCard :: props', props);
  const {
    title,
    summary,
    description,
    ctaText,
    ctaURL,
    image,
    openInNewWindow,
    border = 'false',
    shadow = false,
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
        preview && <EditText type='Promo Card' />
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
  component: PromoCard,
  definition: {
    id: 'promo-card',
    name: 'Promo Card',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Card for displaying a promotion',
    },
    builtInStyles: [
      'cfMargin',
      'cfPadding',
      'cfTextColor',
      'cfBackgroundColor',
      'cfHeight',
      'cfWidth',
      'cfMaxWidth',
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
      border: {
        description: 'Display a border around the promo card',
        displayName: 'Border',
        type: 'Text',
        defaultValue: 'false',
        group: 'style',
        validations: {
          in: [
            { displayName: 'True', value: 'true' },
            { displayName: 'False', value: 'false' },
          ],
        },
      },
      shadow: {
        description: 'Display a drop shadow under the promo card',
        displayName: 'Shadow',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
    },
  },
};

const PromoCardCard = (props: any): JSX.Element => {
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
      className={`bg-inherit overflow-hidden text-inherit w-full ${
        border !== 'false' && 'border'
      }`}
    >
      {image && (
        <CardHeader
          floated={false}
          shadow={false}
          color='transparent'
          className='bg-inherit m-0 rounded-b-none text-inherit w-full'
        >
          {image && (
            <Image
              src={getContentfulImageUrl(image)!}
              alt={title}
              height='256'
              width='320'
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
                <FontAwesomeIcon icon={ICONS['arrow-right']} />
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
