'use client';

import {
  GridButton,
  Icon,
  Pagination,
  ProductFacets,
  ProductList,
  Sorts,
} from '@/components/designSystem';
import { useAppContext, useSiteLabels } from '@/hooks';
import {
  Breadcrumb,
  Facet,
  Product,
  Sort,
  SortOption,
} from '@/models/commerce-types';
import { getProducts } from '@/services/sap/products';
import { formatMessage } from '@/utils/string-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Alert, Spinner, Typography } from '@material-tailwind/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SearchResults(props: any) {
  const { header, variant: initVariant, ...passedProps } = props;
  const { state } = useAppContext();
  const { siteLabels } = useSiteLabels();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const currentPage = searchParams.get('currentPage') || '0';

  const [breadcrumbs, setBreadcrumbs] = React.useState<Array<Breadcrumb>>();
  const [currentQuery, setCurrentQuery] = React.useState<any>();
  const [facets, setFacets] = React.useState<Array<Facet>>();
  const [pagination, setPagination] = React.useState<any>();
  const [products, setProducts] = React.useState<Array<Product>>();
  const [error, setError] = React.useState<any>();
  const [searchTerm, setSearchTerm] = React.useState<string>();
  const [showAlert, setShowAlert] = React.useState<boolean>();
  const [sort, setSort] = React.useState<string>();
  const [sortOptions, setSortOptions] = React.useState<Array<SortOption>>();
  const [variant, setVariant] = React.useState<string>(initVariant);

  React.useEffect(() => {
    let isMounted = true;
    const [lang] = state.currentLocale.split('-');

    const loadProducts = async () => {
      await getProducts({
        query,
        currentPage,
        lang,
      })
        .then((results) => {
          if (isMounted) {
            const {
              breadcrumbs,
              currentQuery,
              facets,
              freeTextSearch,
              pagination,
              products,
              sorts,
            } = results;

            const sortOpts: Array<SortOption> = sorts.map((opt: Sort) => {
              return {
                displayName: opt.name,
                value: opt.code,
                selected: opt.selected,
              };
            });

            const lastSort = sortOpts.find(
              (option: any) => option.selected === true
            );

            setBreadcrumbs(breadcrumbs);
            setCurrentQuery(currentQuery);
            setFacets(facets);
            setSearchTerm(freeTextSearch);
            setPagination(pagination);
            setProducts(products);
            setSort(lastSort?.value || 'relevance');
            setSortOptions(sortOpts);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setError(error);
        });
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [query, currentPage, props, state]);

  const reloadProducts = (
    queryValue: string,
    params?: Record<string, string>
  ): void => {
    if (!queryValue) return;
    const searchParams = {
      q: queryValue,
      ...params,
    };
    const newSearchParams = new URLSearchParams(searchParams);
    router.push(
      pathname + '?' + decodeURIComponent(newSearchParams.toString())
    );
  };

  const toggleLayout = () => {
    if (variant === 'card') {
      setVariant('banner');
    } else {
      setVariant('card');
    }
  };

  const handleChangePage = (newPage: number): void => {
    if (!currentQuery) return;
    const queryValue = currentQuery.query.value;
    reloadProducts(queryValue, { currentPage: '' + newPage });
  };

  const handleChangeSort = (newSort: string): void => {
    if (!currentQuery || !currentQuery.query.value) return;
    let newQueryValue = currentQuery.query.value;
    if (newQueryValue.indexOf(sort) > -1) {
      newQueryValue = newQueryValue.replace(sort, newSort);
    } else {
      newQueryValue = `:${newSort}${currentQuery.value}`;
    }
    reloadProducts(newQueryValue);
  };

  return (
    <>
      {!products && !error && (
        <div className='flex flex-col h-screen items-center justify-center w-full'>
          <Spinner className='h-20 w-20' color='amber' />
        </div>
      )}
      {error && (
        <Alert
          color='red'
          icon={
            <Icon
              className='flex flex-wrap gap-2'
              iconName='exclamation-circle'
              prefix='fas'
              size='xl'
            />
          }
          onClose={() => setShowAlert(false)}
          open={showAlert}
          variant='outlined'
        >
          <Typography>{siteLabels['message.sapServiceError']}</Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: error.message.substring(
                error.message.indexOf('<body'),
                error.message.indexOf('</body>') + 7
              ),
            }}
          />
        </Alert>
      )}
      {header && pagination && (
        <div className='flex flex-col items-center justify-center max-w-screen-xl mx-auto py-2 w-full'>
          <Typography className='font-normal text-3xl' variant='h1'>
            {searchTerm
              ? formatMessage(
                  siteLabels['message.resultsFoundWithTerm'],
                  pagination?.totalResults,
                  searchTerm!
                )
              : formatMessage(
                  siteLabels['message.resultsFound'],
                  pagination?.totalResults
                )}
          </Typography>
          <Typography className='font-normal text-lg'>
            {formatMessage(
              siteLabels['message.resultsCount'],
              `${pagination.currentPage * pagination?.pageSize + 1}`,
              `${
                (pagination.currentPage + 1) * pagination?.pageSize -
                (products?.length ? pagination?.pageSize - products?.length : 0)
              }`,
              `${pagination?.totalResults}`
            )}
          </Typography>
        </div>
      )}
      {products && (
        <div className='flex flex-row items-start max-w-screen-xl mx-auto w-full'>
          <div className='flex-col hidden items-center justify-start lg:flex lg:w-1/4 xl:w-1/5 pt-8 px-4 w-0'>
            {facets && (
              <ProductFacets
                {...{
                  breadcrumbs,
                  facets,
                  reloadProducts,
                  setFacets,
                }}
              />
            )}
          </div>
          <div className='flex flex-col items-center justify-center lg:w-3/4 xl:w-4/5 pt-8 px-4 w-full'>
            <div className='border-b box-border flex flex-wrap gap-2 items-end justify-center mx-auto pb-4 w-full'>
              {sortOptions && (
                <div className='max-w-56 mr-auto'>
                  <Sorts {...{ handleChangeSort, sortOptions }} />
                </div>
              )}
              {pagination && (
                <Pagination {...{ handleChangePage, pagination }} />
              )}
              <GridButton {...{ variant, toggleLayout }} />
            </div>
            {products && (
              <div
                className={` flex ${
                  variant === 'card' ? 'flex-wrap' : 'flex-col'
                } min-h-[32rem] my-10 w-full`}
              >
                <ProductList {...{ ...passedProps, variant, products }} />
              </div>
            )}
            <div className='border-t box-border flex flex-wrap gap-2 items-start justify-between pt-4 w-full'>
              {sortOptions && <Sorts {...{ handleChangeSort, sortOptions }} />}
              {pagination && (
                <Pagination {...{ handleChangePage, pagination }} />
              )}
              <GridButton {...{ variant, toggleLayout }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const searchResultsDefinition: ComponentDefinition = {
  id: 'search-results',
  name: 'Search Results',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/2f4RItm5iPwFZigGa0QvKo/b8f8416b99281af29cd6c2772df53fa6/search_results.svg',
  tooltip: {
    description: 'Enter your description here',
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
    variant: {
      description: 'variant options for the product cards',
      displayName: 'Default display',
      type: 'Text',
      group: 'style',
      defaultValue: 'card',
      validations: {
        in: [
          { displayName: 'Banners', value: 'banner' },
          { displayName: 'Cards', value: 'card' },
        ],
      },
    },
    cols: {
      displayName: 'Cards / Row',
      type: 'Text',
      group: 'style',
      defaultValue: '3',
      validations: {
        in: [
          { displayName: '3', value: '3' },
          { displayName: '4', value: '4' },
          { displayName: '5', value: '5' },
        ],
      },
    },
    header: {
      displayName: 'Show Search Results Header',
      type: 'Boolean',
      group: 'style',
      defaultValue: true,
    },
    border: {
      description: 'Display a border around each product card',
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
      description: 'Display a drop shadow under each product card',
      displayName: 'Shadow',
      type: 'Boolean',
      defaultValue: false,
      group: 'style',
    },
    addtocart: {
      displayName: 'Show ATC Options',
      type: 'Boolean',
      group: 'style',
      defaultValue: true,
    },
    reviews: {
      displayName: 'Show Reviews',
      type: 'Boolean',
      group: 'style',
      defaultValue: true,
    },
  },
};
