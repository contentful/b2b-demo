'use client';
import { EditText, FAQ } from '@/components/designSystem';
import {
  TailwindColors,
  TextFormats,
} from '@/components/designSystem/picker-options';
import { useEditMode } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import React from 'react';

export default function FAQList(props: any) {
  const { editMode } = useEditMode();

  const { qcolor, qformat, variant } = props;

  const [entries, setEntries] = React.useState<Array<any>>();

  React.useEffect(() => {
    let isMounted = true;

    const loadEntries = () => {
      if (props.entries) {
        if (isMounted) {
          setEntries(props.entries);
        }
      }
    };

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, [props]);

  return (
    <>
      {!entries ? (
        editMode && <EditText type='FAQ List' />
      ) : (
        <div className='bg-inherit flex flex-col gap-2 items-center justify-center m-0 p-0 text-inherit w-full'>
          {entries?.map((faq: any, key: number) => {
            const faqProps = {
              answer: faq?.fields.answer,
              pos: key + 1,
              question: faq?.fields.question,
              qcolor,
              qformat,
              variant,
            };
            return <FAQ key={key} {...faqProps} />;
          })}
        </div>
      )}
    </>
  );
}

export const faqListDefinition: ComponentDefinition = {
  id: 'faq-list',
  name: 'FAQ List',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/sbdQDrIA0WDnBxgq1cAa1/b9c2961c2be22f0a86171bfa0902ff4f/faq_list.svg',
  tooltip: {
    description: 'Displays a list of FAQs',
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
    entries: {
      displayName: 'Entries',
      type: 'Array',
      group: 'content',
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
      defaultValue: 'h5',
      validations: {
        in: TextFormats,
      },
    },
  },
};
