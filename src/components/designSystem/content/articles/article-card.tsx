'use client';
import { EditText, ICONS } from '@/components/designSystem';
import { useAppContext, useEditMode } from '@/hooks';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { localizeDate } from '@/utils/locale-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard(props: any) {
  const { editMode } = useEditMode();

  const { variant, border, shadow, ...fields } = props;
  const article = {
    ...fields,
    author: fields.author?.fields.name,
  };

  const isEmpty = (arg0: Record<string, any>) => {
    const fields = ['image', 'pubDate', 'slug', 'teaser', 'title', 'type'];
    for (let f in arg0) {
      if (fields.includes(f)) {
        if (arg0[f]) return false;
      }
    }
    return true;
  };

  return (
    <>
      {(!article || isEmpty(article)) && editMode && (
        <EditText type='Article Card' />
      )}
      {article &&
        !isEmpty(article) &&
        (variant === 'banner' ? (
          <ArticleCardHorizontal {...{ article, border, shadow }} />
        ) : (
          <ArticleCardVertical {...{ article, border, shadow }} />
        ))}
    </>
  );
}

export const articleCardDefinition: ComponentDefinition = {
  id: 'article-card',
  name: 'Article Card',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/2lIkFNlct7M1JyQUE00Hrz/1e770e1d7fdbe076d9712b6438c4fb87/article_card.svg',
  tooltip: {
    description: 'Card with CTA link to article',
  },
  builtInStyles: [
    'cfMargin',
    'cfPadding',
    'cfTextColor',
    'cfBackgroundColor',
    'cfBorder',
  ],
  variables: {
    image: {
      displayName: 'Image',
      type: 'Media',
    },
    title: {
      displayName: 'Title',
      type: 'Text',
    },
    teaser: {
      displayName: 'Teaser',
      type: 'RichText',
    },
    author: {
      displayName: 'Author',
      type: 'Link',
    },
    pubDate: {
      displayName: 'Publish Date',
      type: 'Text',
    },
    type: {
      displayName: 'Type',
      type: 'Text',
    },
    slug: {
      displayName: 'Slug',
      type: 'Text',
    },
    variant: {
      displayName: 'Variant',
      type: 'Text',
      group: 'style',
      defaultValue: 'banner',
      validations: {
        in: [
          { displayName: 'banner', value: 'banner' },
          { displayName: 'card', value: 'card' },
        ],
      },
    },
    border: {
      description: 'Display a border around the article card',
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
      description: 'Display a drop shadow under the article card',
      displayName: 'Shadow',
      type: 'Boolean',
      defaultValue: false,
      group: 'style',
    },
  },
};

const ArticleCardHorizontal = (props: any) => {
  const { article, border, shadow } = props;
  const { state } = useAppContext();
  const { currentLocale: locale } = state;
  return (
    <Link
      className='w-full'
      href={article?.slug ? `/articles/${article?.slug}` : '#'}
    >
      <div
        className={`flex gap-4 items-center md:max-w-screen-xl p-2 rounded-xl sm:max-w-screen-md text-inherit w-full ${
          border !== 'false' && 'border'
        } ${shadow && 'shadow-lg'}`}
      >
        {article?.image && (
          <Avatar
            alt={article?.title}
            className='aspect-square '
            size='xxl'
            src={article?.image}
            variant='rounded'
          />
        )}
        <div className='flex flex-col grow items-start justify-start w-full'>
          <div className='flex items-center justify-between w-full'>
            {article?.title && (
              <Typography
                className='text-lg w-full'
                variant='h4'
                color='inherit'
              >
                {article?.title}
              </Typography>
            )}
            {article?.type && <Chip value={article?.type} />}
          </div>

          {article?.teaser && typeof article?.teaser === 'string' ? (
            <div
              color='inherit'
              className='font-normal m-0 w-fit'
              dangerouslySetInnerHTML={{ __html: article?.teaser }}
            />
          ) : (
            <div className='m-0 w-fit'>
              {documentToReactComponents(article?.teaser)}
            </div>
          )}

          {(article?.pubDate || article?.author) && (
            <div className='flex gap-2 items-center w-full'>
              {article?.pubDate && (
                <>
                  <Typography as='span' className='font-normal m-0 w-fit'>
                    {localizeDate(locale, article?.pubDate)}
                  </Typography>
                  <FontAwesomeIcon icon={ICONS['dot-circle']} size='xs' />
                </>
              )}
              {article?.author && (
                <Typography as='span' className='font-normal m-0 w-fit'>
                  {article?.author}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const ArticleCardVertical = (props: any) => {
  const { article, border, shadow } = props;
  const { state } = useAppContext();
  const { currentLocale: locale } = state;
  return (
    <Link
      className='h-full text-inherit w-full'
      href={article?.slug ? `/articles/${article?.slug}` : '#'}
    >
      <Card
        shadow={shadow}
        className={`bg-inherit flex flex-col h-full overflow-hidden text-inherit w-full ${
          border !== 'false' ? 'border' : 'rounded-none'
        }`}
      >
        {article?.image && (
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='h-64 m-0 rounded-none w-full'
          >
            <Image
              className='h-full object-cover w-full text-inherit'
              src={getContentfulImageUrl(article?.image)!}
              alt={article?.title}
              height='256'
              width='320'
            />
          </CardHeader>
        )}
        <CardBody className='grow pb-2 text-inherit w-full'>
          {article?.type && (
            <Chip className='mb-4 w-fit' value={article.type} />
          )}
          {article?.title && (
            <Typography
              className='text-inherit w-full'
              variant='h4'
              color='inherit'
            >
              {article?.title}
            </Typography>
          )}
          {article?.teaser && typeof article?.teaser === 'string' ? (
            <div
              className='mt-3 font-normal text-inherit w-full'
              color='inherit'
              dangerouslySetInnerHTML={{ __html: article?.teaser }}
            />
          ) : (
            <div className='mt-3 w-full'>
              {article?.teaser &&
                (typeof article?.teaser === 'string' ? (
                  <div
                    color='inherit'
                    className='font-normal m-0 text-inherit'
                    dangerouslySetInnerHTML={{ __html: article?.teaser }}
                  />
                ) : (
                  <>{documentToReactComponents(article?.teaser)}</>
                ))}
            </div>
          )}
        </CardBody>
        {(article?.author || article?.pubDate) && (
          <CardFooter className='pt-2 text-inherit w-full'>
            <div className='flex items-center justify-between mt-6 w-full'>
              {article?.author && (
                <Typography
                  className='font-bold m-0 text-inherit'
                  color='inherit'
                >
                  {article?.author}
                </Typography>
              )}
              {article?.pubDate && (
                <Typography
                  className='font-bold m-0 text-inherit'
                  color='inherit'
                >
                  {localizeDate(locale, article?.pubDate)}
                </Typography>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
