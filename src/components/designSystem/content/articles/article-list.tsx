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

  const [articles, setArticles] = React.useState<Array<any>>();
  const [error, setError] = React.useState<any>();
  const [lastSearchParams, setLastSearchParams] =
    React.useState<Record<string, any>>();
  const [variant, setVariant] = React.useState<string>(props.variant);
  const [sortOptions, setSortOptions] = React.useState<any>();
  const [pagination, setPagination] = React.useState<Record<string, any>>({
    currentPage: 0,
    pageSize: 0,
    skip: 0,
    totalResults: 0,
    totalPages: 0,
  });

  const locale = state.currentLocale;
  const { title } = props;

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setSortOptions([
        {
          displayName: siteLabels['option.sort.pubDate-asc'],
          value: 'pubDate-asc',
          selected: sort === 'pubDate-asc',
        },
        {
          displayName: siteLabels['option.sort.pubDate-desc'],
          value: 'pubDate-desc',
          selected: sort === 'pubDate-desc',
        },
        {
          displayName: siteLabels['option.sort.title-asc'],
          value: 'title-asc',
          selected: sort === 'title-asc',
        },
        {
          displayName: siteLabels['option.sort.title-desc'],
          value: 'title-desc',
          selected: sort === 'title-desc',
        },
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, []);

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
      getArticles(entriesQuery)
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
  }, [searchParams]);

  const handleChangePage = (newPage: number) => {
    if (!lastSearchParams) return;

    const newSearchParams = {
      ...lastSearchParams,
      page: '' + newPage,
    };
    const newURLSearchParams = new URLSearchParams(newSearchParams);
    const newRoute = pathname + '?' + newURLSearchParams.toString();

    router.push(newRoute);
  };

  const handleChangeSort = (newSort: string) => {
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
          <Heading variant={props.headingVariant || 'h2'}>
            {siteLabels['label.articles']}
          </Heading>

          {pagination && (
            <Typography className='font-normal text-lg'>
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
