import { EditText } from '@/components/designSystem';
import {
  TailwindColors,
  TextFormats,
} from '@/components/designSystem/picker-options';
import { useSiteLabels } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

export default function FAQ(props: any) {
  const { siteLabels } = useSiteLabels();

  const preview = props.isInExpEditorMode;
  const { answer, pos = 1, qcolor, qformat, question, variant } = props;

  const [open, setOpen] = React.useState<number>(0);

  const handleOpen = (idx: number) => setOpen(open === idx ? 0 : idx);
  const hasContent = question && answer;

  return (
    <>
      {!hasContent ? (
        preview && <EditText type='FAQ' />
      ) : variant === 'accordion' ? (
        <Accordion className='text-inherit w-full' open={open === pos}>
          <AccordionHeader
            className='text-inherit'
            onClick={() => handleOpen(pos)}
          >
            <Typography color={qcolor} variant={qformat}>
              {question}
            </Typography>
          </AccordionHeader>
          <AccordionBody className='text-inherit'>
            <Typography as='div' color='inherit'>
              {documentToReactComponents(answer)}
            </Typography>
          </AccordionBody>
        </Accordion>
      ) : (
        <div className='flex flex-col text-inherit w-full'>
          <div className='flex gap-2 text-inherit w-full'>
            <Typography color={qcolor} variant={qformat}>
              {siteLabels['label.question']?.substring(0, 1)}:
            </Typography>
            <Typography className='grow' color={qcolor} variant={qformat}>
              {question}
            </Typography>
          </div>
          <div className='flex gap-2 items-start text-inherit w-full'>
            <Typography className='font-bold m-0' color='inherit'>
              {siteLabels['label.answer']?.substring(0, 1)}:
            </Typography>
            <Typography as='div' className='grow' color='inherit'>
              {documentToReactComponents(answer)}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}

export const faqDefinition: ComponentDefinition = {
  component: FAQ,
  definition: {
    id: 'faq',
    name: 'FAQ',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'frequently asked question component',
    },
    builtInStyles: [
      'cfBackgroundColor',
      'cfMargin',
      'cfPadding',
      'cfTextColor',
    ],
    variables: {
      question: {
        displayName: 'Question',
        type: 'Text',
      },
      answer: {
        displayName: 'Answer',
        type: 'RichText',
      },
      variant: {
        displayName: 'Variant',
        type: 'Text',
        group: 'style',
        defaultValue: 'accordion',
        validations: {
          in: [
            { displayName: 'Accordion', value: 'accordion' },
            { displayName: 'Paragraph', value: 'paragraph' },
          ],
        },
      },
      qcolor: {
        displayName: 'Question Color',
        type: 'Text',
        group: 'style',
        defaultValue: 'inherit',
        validations: {
          in: [{ displayName: 'inherit', value: 'inherit' }, ...TailwindColors],
        },
      },
      qformat: {
        displayName: 'Question Format',
        type: 'Text',
        group: 'style',
        defaultValue: 'h6',
        validations: {
          in: TextFormats,
        },
      },
    },
  },
};
