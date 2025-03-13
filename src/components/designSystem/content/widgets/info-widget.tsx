import { useEditMode } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function InfoWidget(props: any) {
  const { editMode } = useEditMode();
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
  id: 'info-widget',
  name: 'Info Widget',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/UCx5ergDX9fFGaQ5lIqlI/98f1b46796da9fcb736144caa887a331/order_history.svg',
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
};

const WidgetBody = (props: any) => {
  const { icon, text } = props;

  return (
    <div className='flex flex-col gap-4 items-center justify-center text-inherit w-full'>
      <div className='h-14 w-14'>
        {icon && (
          <Image
            alt='icon'
            className='h-full object-contain w-full'
            height='56'
            src={icon}
            width='56'
          />
        )}
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
