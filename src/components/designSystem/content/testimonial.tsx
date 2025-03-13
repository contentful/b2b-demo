'use client';
import { EditText } from '@/components/designSystem';
import { useAppContext, useEditMode } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Rating,
  Typography,
} from '@material-tailwind/react';

export default function Testimonial(props: any) {
  const { editMode } = useEditMode();

  const { quote, rating, border, shadow } = props;
  const reviewer = props.reviewer?.fields;
  const avatarUrl = reviewer?.avatar?.fields?.file?.url;

  return (
    <>
      {!(quote || reviewer || rating) ? (
        editMode && <EditText type='Testimonial' />
      ) : (
        <Card
          color='transparent'
          shadow={shadow}
          className={`w-full max-w-[30rem] mx-auto px-6 ${
            border !== 'false' && 'border'
          }`}
        >
          <CardHeader
            color='transparent'
            floated={false}
            shadow={false}
            className='flex items-center gap-4 mx-0 pt-0 pb-8'
          >
            <Avatar
              size='lg'
              variant='circular'
              src={avatarUrl}
              alt={reviewer?.name ?? ''}
            />
            <div className='flex w-full flex-col gap-0.5'>
              <div className='flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray'>
                  {reviewer?.firstName} {reviewer?.lastName}
                </Typography>
                <div className='5 flex items-center gap-0'>
                  <Rating value={rating} />
                </div>
              </div>
              <Typography color='blue-gray'>
                {reviewer?.title} @ {reviewer?.organization}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className='mb-6 mx-auto p-0'>
            <Typography>&quot;{quote}&quot;</Typography>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export const testimonialDefinition: ComponentDefinition = {
  id: 'testimonial',
  name: 'Testimonial',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/13PExzxKK7tECtdLRlI5vM/f37a286e71fdcaa1a0b2dc6d24cd25af/testimonial.svg',
  tooltip: {
    description: 'A card displaying a testimonial',
  },
  variables: {
    reviewer: {
      description: 'The reviewer from the testimonial content item',
      displayName: 'Reviewer',
      type: 'Link',
    },
    rating: {
      description: 'The rating from the testimonail content item',
      displayName: 'Rating',
      type: 'Number',
      defaultValue: 0.0,
    },
    quote: {
      description: 'The quote from the testimonial content item',
      displayName: 'Quote',
      type: 'Text',
    },
    border: {
      description: 'Display a border around the testimonial card',
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
      description: 'Display a drop shadow under the testimonial card',
      displayName: 'Shadow',
      type: 'Boolean',
      defaultValue: false,
      group: 'style',
    },
  },
  builtInStyles: ['cfMargin'],
};
