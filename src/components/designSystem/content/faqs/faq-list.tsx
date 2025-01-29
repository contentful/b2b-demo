import { EditText, FAQ } from '@/components/designSystem';
import {
  TailwindColors,
  TextFormats,
} from '@/components/designSystem/picker-options';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import React from 'react';

export default function FAQList(props: any) {
  const preview = props.isInExpEditorMode;
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
        preview && <EditText type='FAQ List' />
      ) : (
        <div className='bg-inherit flex flex-col gap-2 items-center justify-center m-0 p-0 text-inherit w-full'>
          {entries?.map((faq: any, key: number) => {
            const question = faq?.fields.question;
            const answer = faq?.fields.answer;
            const pos = key + 1;
            return (
              <FAQ
                key={key}
                {...{
                  answer,
                  pos,
                  question,
                  qcolor,
                  qformat,
                  variant,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export const faqListDefinition: ComponentDefinition = {
  component: FAQList,
  definition: {
    id: 'faq-list',
    name: 'FAQ List',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Displays a list of FAQs',
    },
    builtInStyles: [
      'cfBackgroundColor',
      'cfMargin',
      'cfPadding',
      'cfTextColor',
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
  },
};
