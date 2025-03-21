'use client';
import {
  ArticleCard,
  ContentError,
  EditText,
  FAQ,
  ICONS,
} from '@/components/designSystem';
import { useAppContext, useEditMode, useSiteLabels } from '@/hooks';
import { ArticleType } from '@/models/content-types';
import { getArticle } from '@/services/contentful/content';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { localizeDate } from '@/utils/locale-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Article(props: any) {
  const { editMode } = useEditMode();
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const pathname = usePathname();

  const [article, setArticle] = React.useState<ArticleType>();
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    let isMounted = true;
    const locale = state.currentLocale;

    const loadArticle = async () => {
      if (pathname) {
        const pathNodes = pathname.substring(1).split('/');
        const slug = pathNodes[pathNodes.length - 1];

        await getArticle(slug, locale)
          .then((articleFields) => {
            if (isMounted) {
              setArticle(articleFields);
            }
          })
          .catch((e: any) => {
            setError(e);
          });
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [pathname, state]);

  return (
    <div className='flex flex-col max-w-screen-xl mx-auto w-full'>
      {error && !editMode ? (
        <ContentError error={error} />
      ) : !article && editMode ? (
        <div className='border flex flex-col items-center justify-start my-5 p-4 w-full'>
          <Typography className='mb-4' variant='h5'>
            Article Component
          </Typography>
          <Typography className='font-normal text-base'>
            Article content will be dynamically displayed based on the type and
            pathname.
          </Typography>
          <EditText type='Article' />
        </div>
      ) : (
        <>
          <div className='flex flex-col my-6 pb-8 pt-5 w-full'>
            <Typography className='leading-normal mb-5 text-4xl' variant='h1'>
              {article?.title}
            </Typography>
            {(article?.author || article?.pubDate) && (
              <div className='flex gap-4 divide-x divide-gray-500 items-center'>
                {article?.author && (
                  <div className='flex font-normal gap-2 items-center leading-6 text-normal text-sm'>
                    <Typography as='span'>{siteLabels['label.by']} </Typography>
                    <Typography as='span' className='font-bold'>
                      {article?.author?.fields.name}
                    </Typography>
                  </div>
                )}
                {article.pubDate && (
                  <Typography
                    as='span'
                    className='font-normal leading-6 pl-4 text-normal'
                    variant='small'
                  >
                    {localizeDate(state.currentLocale, article?.pubDate)}
                  </Typography>
                )}
              </div>
            )}
            <div className='border-b box-border my-4 w-full'></div>
            <div className='flex gap-2 items-center justify-start mt-3 w-full'>
              <Typography
                as='span'
                className='font-bold mb-0 text-normal uppercase'
                variant='small'
              >
                {siteLabels['label.share']}
              </Typography>
              <FontAwesomeIcon
                color='#316FF6'
                icon={ICONS['facebook-square']}
                size='lg'
              />
              <FontAwesomeIcon
                color='#0077B5'
                icon={ICONS['linkedin']}
                size='lg'
              />
              <FontAwesomeIcon
                color='#1da1f2'
                icon={ICONS['twitter-square']}
                size='lg'
              />
              <FontAwesomeIcon
                color='#339933'
                icon={ICONS['envelope-square']}
                size='lg'
              />
            </div>
          </div>
          <div className='flex items-start w-full'>
            <div
              className={`flex flex-col ${
                article?.relatedArticles ? 'w-3/4' : 'w-full'
              }`}
            >
              {article?.image && (
                <div className='p-2 w-full'>
                  <Image
                    alt=''
                    className='h-full object-contain w-full'
                    src={getContentfulImageUrl(article?.image)!}
                    height='636'
                    width='954'
                  />
                </div>
              )}
              <div className='p-2 text-base text-normal w-full'>
                {documentToReactComponents(article?.body!)}
              </div>
              {article?.faqs && (
                <div className='flex flex-col text-base text-normal px-2 w-full'>
                  <Typography as='h2' className='text-2xl' variant='h2'>
                    {
                      // TODO -- replace below with siteLabels
                    }
                    {state.currentLocale === 'de-DE'
                      ? 'Häufig gestellte Fragen'
                      : 'Frequently Asked Questions'}
                  </Typography>
                  {article.faqs.map((faq: any, key: number) => {
                    const { question, answer } = faq.fields;
                    return (
                      <FAQ
                        key={key}
                        {...{ question, questionTextFormat: 'h6', answer }}
                      />
                    );
                  })}
                </div>
              )}
              {article?.sources && (
                <div className=' flex flex-col px-2 text-base text-normal w-full'>
                  <Typography as='h2' className='text-2xl' variant='h2'>
                    {
                      // TODO -- replace below with siteLabels
                    }
                    {state.currentLocale === 'de-DE' ? 'Quellen' : 'Sources'}
                  </Typography>
                  {documentToReactComponents(article?.sources)}
                </div>
              )}
            </div>
            {article?.relatedArticles && (
              <div className='w-1/4'>
                <div className='m-2'>
                  {article?.relatedArticles.map((related: any, key: number) => {
                    const { fields } = related;
                    return (
                      <ArticleCard
                        key={key}
                        {...{
                          ...fields,
                          display: 'vertical',
                          border: 'true',
                          shadow: false,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export const articleDefinition: ComponentDefinition = {
  id: 'article',
  name: 'Article',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/7zXHpz9qZbiD8e5RAtKGWb/2145d0f863444ecafb848b787f04d917/article.svg',
  tooltip: {
    description: 'Article Details Component',
  },
  variables: {},
};
