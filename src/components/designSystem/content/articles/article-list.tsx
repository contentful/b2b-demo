'use client';

import {
  ArticleCard,
  ContentError,
  GridButton,
  Heading,
  Pagination,
  Sorts,
} from '@/components/designSystem/';
import { HeadingFormats } from '@/components/designSystem/picker-options';
import { useAppContext, useSiteLabels } from '@/hooks';
import { ArticleListType, ArticleType } from '@/models/content-types';
import { getArticles } from '@/services/contentful/content';
import { formatMessage } from '@/utils/string-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Typography } from '@material-tailwind/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const DEFAULT_LIMIT = 9;
const DEFAULT_PAGE = 0;

export default function ArticleList(props: any) {
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const skip = currentPage * limit;
  const sort = searchParams.get('sort') || props.sort || 'pubDate-desc';
  const [field, dir] = sort.split('-');
  const type = searchParams.get('type') || props.type;

  const [articles, setArticles] = React.useState<Array<ArticleType>>();
  const [error, setError] = React.useState<any>();
  const [lastSearchParams, setLastSearchParams] =
    React.useState<Record<string, any>>();
  const [variant, setVariant] = React.useState<string>(props.variant);

  const [pagination, setPagination] = React.useState<Record<string, any>>({
    currentPage: 0,
    pageSize: 0,
    skip: 0,
    totalResults: 0,
    totalPages: 0,
  });

  const locale = state.currentLocale;

  const sortOptions = [
    'pubDate-asc',
    'pubDate-desc',
    'title-asc',
    'title-desc',
  ].map((value: string) => {
    const displayName = siteLabels['option.sort.' + value];
    return {
      displayName,
      value,
      selected: sort === value,
    };
  });

  React.useEffect(() => {
    let isMounted = true;
    const loadArticles = async () => {
      const entriesQuery: any = {
        locale,
        limit,
        skip,
        order: dir === 'desc' ? [`-fields.${field}`] : [`fields.${field}`],
        'fields.type': type,
      };
      await getArticles(entriesQuery)
        .then(({ entries, pagination }) => {
          if (isMounted) {
            setArticles(entries);
            setPagination(pagination);
          }
        })
        .catch((e) => {
          setError(e);
        });

      const currentSearchParams: any = { sort };
      if (limit !== DEFAULT_LIMIT) currentSearchParams['limit'] = limit;
      if (currentPage !== DEFAULT_PAGE)
        currentSearchParams['page'] = currentPage;
      setLastSearchParams(currentSearchParams);
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, [currentPage, dir, field, limit, locale, skip, sort, type]);

  const handleChangePage = (newPage: number): void => {
    if (!lastSearchParams) return;

    const newSearchParams = {
      ...lastSearchParams,
      page: '' + newPage,
    };
    const newURLSearchParams = new URLSearchParams(newSearchParams);
    const newRoute = pathname + '?' + newURLSearchParams.toString();

    router.push(newRoute);
  };

  const handleChangeSort = (newSort: string): void => {
    if (!newSort || !lastSearchParams) return;
    const newSearchParams = new URLSearchParams({
      ...lastSearchParams,
      sort: newSort,
    });
    router.push(pathname + '?' + newSearchParams.toString());
  };

  const toggleLayout = () => {
    setVariant((variant) => {
      return variant === 'banner' ? 'card' : 'banner';
    });
  };

  return (
    <div className='flex flex-col h-fit items-center justify-center max-w-screen-xl mx-auto w-full'>
      {error ? (
        <ContentError error={error} />
      ) : (
        <>
          {pagination && (
            <Typography className='font-normal px-2 text-lg text-start w-full'>
              {formatMessage(
                siteLabels['message.resultsCount'],
                `${pagination.currentPage * pagination?.pageSize + 1}`,
                `${
                  (pagination.currentPage + 1) * pagination?.pageSize -
                  (articles?.length
                    ? pagination?.pageSize - articles?.length
                    : 0)
                }`,
                `${pagination?.totalResults}`
              )}
            </Typography>
          )}

          <div className='border-b box-border flex items-start py-4 w-full'>
            {sortOptions && <Sorts {...{ handleChangeSort, sortOptions }} />}
            {pagination && <Pagination {...{ handleChangePage, pagination }} />}
            <GridButton {...{ variant, toggleLayout }} />
          </div>

          <div
            className={`flex ${
              variant === 'banner' ? 'flex-col' : 'flex-row flex-wrap'
            } my-5 w-full`}
          >
            {articles?.map((article: any, key: number) => {
              const { title, type, image, teaser, author, pubDate, slug } =
                article;
              const width = variant === 'banner' ? 'w-full' : 'w-1/3';

              return (
                <div className={`p-2 ${width}`} key={key}>
                  <ArticleCard
                    {...{
                      title,
                      type,
                      image: image.fields.file?.url,
                      teaser,
                      author,
                      pubDate,
                      slug,
                      variant,
                      border: 'false',
                      shadow: false,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className='border-b box-border flex items-start py-4 w-full'>
            {sortOptions && <Sorts {...{ handleChangeSort, sortOptions }} />}
            {pagination && <Pagination {...{ handleChangePage, pagination }} />}
            <GridButton {...{ variant, toggleLayout }} />
          </div>
        </>
      )}
    </div>
  );
}

export const articleListDefinition: ComponentDefinition = {
  component: ArticleList,
  definition: {
    id: 'article-list',
    name: 'Article List',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Displays a list of articles based on defined criteria',
    },
    builtInStyles: ['cfTextColor', 'cfTextAlign'],
    variables: {
      title: {
        displayName: 'Title',
        type: 'Text',
        group: 'content',
        defaultValue: 'Articles',
      },
      type: {
        displayName: 'Article Type',
        type: 'Text',
        group: 'style',
        defaultValue: '',
        validations: {
          in: [
            { displayName: 'All', value: '' },
            { displayName: 'Blog', value: 'blog' },
            { displayName: 'Support', value: 'support' },
          ],
        },
      },
      variant: {
        displayName: 'Layout Variant',
        type: 'Text',
        group: 'style',
        defaultValue: 'horizontal',
        validations: {
          in: [
            { displayName: 'Rows', value: 'banner' },
            { displayName: 'Grid', value: 'card' },
          ],
        },
      },
      sort: {
        displayName: 'List Sort',
        type: 'Text',
        group: 'style',
        defaultValue: 'pubDate-asc',
        validations: {
          in: [
            { displayName: 'Publish Date Ascending', value: 'pubDate-asc' },
            { displayName: 'Publish Date Descending', value: 'pubDate-desc' },
            { displayName: 'Title Ascending', value: 'title-asc' },
            { displayName: 'Title Descending', value: 'title-desc' },
          ],
        },
      },
      headingVariant: {
        displayName: 'Title Variant',
        type: 'Text',
        validations: {
          in: HeadingFormats,
        },
        defaultValue: 'h2',
        group: 'style',
      },
    },
  },
};
