'use client';
import { EditText } from '@/components/designSystem';
import {
  TailwindColors,
  TextFormats,
} from '@/components/designSystem/picker-options';
import { useEditMode, useSiteLabels } from '@/hooks';
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
  const { editMode } = useEditMode();
  const { siteLabels } = useSiteLabels();

  const { answer, pos = 1, qcolor, qformat, question, variant } = props;

  const [open, setOpen] = React.useState<number>(0);

  const handleOpen = (idx: number) => setOpen(open === idx ? 0 : idx);
  const hasContent = question && answer;

  return (
    <>
      {!hasContent ? (
        editMode && <EditText type='FAQ' />
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
  id: 'faq',
  name: 'FAQ',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/DPUKWbm9BMHwkZY9q0Cx4/da26f1b2c12b1e2dfa7479d2eb4f76bf/faq.svg',
  tooltip: {
    description: 'frequently asked question component',
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
};
