import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Typography } from '@material-tailwind/react';
import Link from 'next/link';

export default function InfoWidget(props: any) {
  const preview = props.isInExpEditorMode;
  const { linkText, linkURL, ...widgetBodyProps } = props;

  return linkURL ? (
    <Link href={linkURL} aria-details={linkText}>
      <WidgetBody {...widgetBodyProps} />
    </Link>
  ) : (
    <WidgetBody {...widgetBodyProps} />
  );
}

export const infoWidgetDefinition: ComponentDefinition = {
  component: InfoWidget,
  definition: {
    id: 'info-widget',
    name: 'Info Widget',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Enter your description here',
    },
    variables: {
      icon: {
        displayName: 'Icon',
        type: 'Media',
        group: 'content',
      },
      text: {
        displayName: 'Text',
        type: 'Text',
        group: 'content',
      },
      linkText: {
        displayName: 'LinkText',
        type: 'Text',
        group: 'content',
      },
      linkURL: {
        displayName: 'LinkURL',
        type: 'Text',
        group: 'content',
      },
    },
  },
};

const WidgetBody = (props: any) => {
  const { icon, text } = props;

  return (
    <div className='flex flex-col gap-4 items-center justify-center text-inherit w-full'>
      <div className='h-14 w-14'>
        {icon && <img className='h-full object-contain w-full' src={icon} />}
      </div>
      {text && (
        <Typography
          as='div'
          className='font-[Inter,"Inter Fallback"] font-medium leading-5 m-0 p-0 text-base/5 text-center text-inherit'
        >
          {text}
        </Typography>
      )}
    </div>
  );
};
