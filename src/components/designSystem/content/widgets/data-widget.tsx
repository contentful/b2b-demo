import { ICONS } from '@/components/designSystem';
import { TailwindColors } from '@/components/designSystem/picker-options';
import { useAppContext } from '@/hooks';
import { localizeDate } from '@/utils/locale-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';

export default function DataWidget(props: any) {
  const preview = props.isInExpEditorMode;
  const { state } = useAppContext();
  const locale = state.currentLocale || 'en-US';

  const {
    title,
    description,
    icon,
    mockData,
    linkText,
    linkURL,
    headerBackground,
    headerText,
  } = props;
  let bgcolor = 'bg-' + headerBackground;
  if (!['black', 'white', 'inherit'].includes(headerBackground)) {
    bgcolor = bgcolor + '-500';
  }
  let textcolor = 'text-' + headerText;
  if (!['black', 'white', 'inherit'].includes(headerText)) {
    textcolor = textcolor + '-500';
  }

  const previewContent = {
    title: 'YTD Orders',
    description: `${localizeDate(
      locale,
      '2025-01-01T05:00:00.000Z',
      false
    )} - ${localizeDate(locale, new Date().toISOString(), false)}`,
    icon: 'info-circle',
    linkText: 'View Orders',
    linkURL: '#',
    mockData: `<p class='font-bold text-inherit w-5/6'>Total orders</p>
              <p class='text-inherit'>17</p>
              <p class='font-bold text-inherit'>Shipped</p>
              <p class='text-inherit'>16</p>
              <p class='font-bold text-inherit'>Delivered</p>
              <p class='text-inherit'>15</p>
              <p class='font-bold text-inherit'>Cancelled</p>
              <p class='text-inherit'>1</p>`,
  };

  return (
    <>
      {(title || mockData || preview) && (
        <Card className='bg-inherit p-0 text-inherit w-full' shadow={false}>
          <CardHeader
            className={`${bgcolor} m-0 rounded-b-none py-2 px-2`}
            floated={false}
            shadow={false}
          >
            <div className={`flex items-center justify-between ${textcolor}`}>
              {(title || preview) && (
                <Typography
                  className='font-[Inter,"Inter Fallback"] font-bold m-0 p-0 text-lg'
                  color='inherit'
                >
                  {title ? title : preview ? previewContent.title : ''}
                </Typography>
              )}
              {icon && (
                <div className='bg-white h-7 p-1 rounded-lg w-7'>
                  <Image
                    alt='icon'
                    className='h-full object-contain w-full'
                    height='20'
                    src={icon}
                    width='20'
                  />
                </div>
              )}
              {!icon && preview && (
                <FontAwesomeIcon icon={ICONS[previewContent.icon]} size='xl' />
              )}
            </div>
          </CardHeader>
          <CardBody className='flex flex-col gap-2 p-2 w-full'>
            <div className='flex items-center justify-between w-full'>
              {description || linkURL ? (
                <Typography
                  as='span'
                  className='font-[Inter,"Inter Fallback"] font-medium text-gray-700'
                >
                  {description}
                </Typography>
              ) : (
                preview &&
                !description && (
                  <Typography
                    as='span'
                    className='font-[Inter,"Inter Fallback"] font-medium text-gray-700'
                  >
                    {previewContent.description}
                  </Typography>
                )
              )}

              {linkText && linkURL ? (
                <Typography
                  as='a'
                  className='font-[Inter,"Inter Fallback"] font-medium'
                  color='blue'
                  href={linkURL}
                >
                  {linkText}
                </Typography>
              ) : (
                preview &&
                !(linkText || linkURL) && (
                  <Typography
                    as='span'
                    className='font-[Inter, "Inter Fallback"]'
                    color='blue'
                  >
                    {previewContent.linkText}
                  </Typography>
                )
              )}
            </div>
            {mockData && (
              <div className='font-[Inter,"Inter Fallback"] mock-data text-inherit w-full'>
                {documentToReactComponents(mockData)}
              </div>
            )}
            {!mockData && preview && (
              <div
                className='font-[Inter,"Inter Fallback"] mock-data grid grid-cols-2 text-inherit w-full'
                dangerouslySetInnerHTML={{ __html: previewContent.mockData }}
              />
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
}

export const dataWidgetDefinition: ComponentDefinition = {
  component: DataWidget,
  definition: {
    id: 'data-widget',
    name: 'Data Widget',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'component to render mock SAP data',
    },
    builtInStyles: [
      'cfTextColor',
      'cfBorder',
      'cfBorderRadius',
      'cfBackgroundColor',
      'cfMargin',
      'cfPadding',
      'cfHeight',
      'cfWidth',
      'cfMaxWidth',
    ],
    variables: {
      title: {
        displayName: 'Title',
        type: 'Text',
        group: 'content',
      },
      description: {
        displayName: 'Description',
        type: 'Text',
        group: 'content',
      },
      icon: {
        displayName: 'Icon',
        type: 'Media',
        group: 'content',
      },
      mockData: {
        displayName: 'Mock Data',
        type: 'RichText',
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
      headerBackground: {
        displayName: 'Header Background',
        type: 'Text',
        group: 'style',
        defaultValue: 'white',
        validations: {
          in: [{ displayName: 'inherit', value: 'inherit' }, ...TailwindColors],
        },
      },
      headerText: {
        displayName: 'Header Text',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: [{ displayName: 'inherit', value: 'inherit' }, ...TailwindColors],
        },
      },
    },
  },
};
