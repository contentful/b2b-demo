import { EditText, ICONS } from '@/components/designSystem';
import { useAppContext } from '@/hooks';
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
import Link from 'next/link';
import React from 'react';

export default function ArticleCard(props: any) {
  const preview = props.isInExpEditorMode;
  const { variant, border, shadow, ...fields } = props;

  const { state } = useAppContext();
  const locale = state.currentLocale;

  const [article, setArticle] = React.useState<Record<string, any>>();

  React.useEffect(() => {
    let isMounted = true;

    const loadArticle = () => {
      if (fields) {
        if (isMounted) {
          setArticle({ ...fields, author: fields.author?.fields.name });
        }
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [props]);

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
      {(!article || isEmpty(article)) && preview && (
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
  component: ArticleCard,
  definition: {
    id: 'article-card',
    name: 'Article Card',
    category: 'Components',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
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
        default: new Date(),
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
        displayName: 'Border',
        type: 'Boolean',
        group: 'style',
        defaultValue: true,
      },
      shadow: {
        displayName: 'Shadow',
        type: 'Boolean',
        group: 'style',
        defaultValue: true,
      },
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
          border && 'border'
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
            <Typography
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
        shadow={shadow ? true : false}
        className={`bg-inherit flex flex-col h-full max-w-[20rem] overflow-hidden text-inherit w-full ${
          border ? 'border' : 'rounded-none'
        }`}
      >
        {article?.image && (
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='h-64 m-0 rounded-none w-full'
          >
            <img
              className='h-full object-cover w-full text-inherit'
              src={article?.image}
              alt={article?.title}
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
            <Typography
              className='mt-3 font-normal text-inherit w-full'
              color='inherit'
              dangerouslySetInnerHTML={{ __html: article?.teaser }}
            />
          ) : (
            <div className='mt-3 w-full'>
              {article?.teaser &&
                (typeof article?.teaser === 'string' ? (
                  <Typography
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
