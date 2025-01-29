import { EditText } from '@/components/designSystem';
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
  const preview = props.isInExpEditorMode;

  const { quote, rating, border, shadow } = props;
  const reviewer = props.reviewer?.fields;
  const avatarUrl = reviewer?.avatar?.fields?.file?.url;

  return (
    <>
      {!(quote || reviewer || rating) ? (
        preview && <EditText type='Testimonial' />
      ) : (
        <Card
          color='transparent'
          shadow={shadow && true}
          className={`w-full max-w-[30rem] mx-auto px-6 ${border && 'border'}`}
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
  component: Testimonial,
  definition: {
    id: 'testimonial',
    name: 'Testimonial',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
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
        description: 'Display a border around the testimonial',
        displayName: 'Border',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
      shadow: {
        description: 'Display a drop shadow for the testimonail',
        displayName: 'Shadow',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
    },
    builtInStyles: ['cfMargin'],
  },
};
