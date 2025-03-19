'use client';
import { ICONS } from '@/components/designSystem';
import { TailwindColors } from '@/components/designSystem/picker-options';
import { useAppContext, useEditMode } from '@/hooks';
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
  const { editMode } = useEditMode();
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
    mockData: `<table>
                  <tr>
                    <th><p>Type</p></th>
                    <th><p>Count</p></th>
                  </tr>
                  <tr>
                    <td><p>All</p></td>
                    <td><p>17</p></td>
                  </tr>
                  <tr>
                    <td><p>Submitted</p></td>
                    <td><p>17</p></td>
                  </tr>
                  <tr>
                    <td><p>Shipped</p></td>
                    <td><p>15</p></td>
                  </tr>
                  <tr>
                    <td><p>Delivered</p></td>
                    <td><p>15</p></td>
                  </tr>
                  <tr>
                    <td><p>Cancelled</p></td>
                    <td><p>1</p></td>
                  </tr>
              </table>
              <p></p>`,
  };

  console.log('mock data ::', documentToReactComponents(mockData));
  return (
    <>
      {(title || mockData || editMode) && (
        <Card className='bg-inherit p-0 text-inherit w-full' shadow={false}>
          <CardHeader
            className={`${bgcolor} m-0 rounded-b-none py-2 px-2`}
            floated={false}
            shadow={false}
          >
            <div className={`flex items-center justify-between ${textcolor}`}>
              {(title || editMode) && (
                <Typography
                  className='font-[Inter,"Inter Fallback"] font-bold m-0 p-0 text-lg'
                  color='inherit'
                >
                  {title ? title : editMode ? previewContent.title : ''}
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
              {!icon && editMode && (
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
                editMode &&
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
                editMode &&
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
            {!mockData && editMode && (
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
  id: 'data-widget',
  name: 'Data Widget',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/5egrdlGnD5wV4GAXdQ5AJ7/9818c7dbe145079eeb8d05edc570833a/data_widget.svg',
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
};
