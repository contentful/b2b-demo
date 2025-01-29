'use client';

import { ICONS } from '@/components/designSystem';
import { useSiteLabels } from '@/hooks';
import { Breadcrumb, Facet, FacetValue } from '@/models/commerce-types';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

export default function ProductFacets(props: any) {
  const { siteLabels } = useSiteLabels();

  const [expanded, setExpanded] = React.useState<Array<string>>(new Array());
  const { breadcrumbs, facets, reloadProducts, setFacets } = props;

  const toggleExpanded = (facetName: string) => {
    let update = new Array();
    if (expanded.includes(facetName)) {
      update = expanded.filter((name) => name !== facetName);
    } else {
      update = [...expanded, facetName];
    }
    setExpanded(update);
  };

  const toggleFacet = (facet: Facet) => {
    facet.visible = !facet.visible;
    const newFacets = facets?.map((f: Facet) => {
      if (f.name === facet.name) {
        return facet;
      }
      return f;
    });
    setFacets(newFacets);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-2 items-center justify-start py-2 w-full'>
        {breadcrumbs.length > 0 && (
          <AppliedFacets {...{ breadcrumbs, reloadProducts }} />
        )}
      </div>
      <div className='pb-3 px-3 w-full'>
        {facets
          ?.sort((a: Facet, b: Facet) => {
            if (a.priority > b.priority) return -1;
            if (a.priority < b.priority) return 1;
            return 0;
          })
          .map((facet: Facet, key: number) => {
            return (
              <Accordion className='w-full' key={key} open={facet.visible}>
                <AccordionHeader
                  className='flex items-center justify-between px-1 w-full'
                  onClick={() => toggleFacet(facet)}
                >
                  <FacetTitle {...{ facet }} />
                </AccordionHeader>
                <AccordionBody className='flex flex-col items-start'>
                  {facet.values
                    .slice(0, 5)
                    .map((facetValue: FacetValue, vkey: number) => {
                      return (
                        <FacetValueItem
                          key={vkey}
                          {...{ facet, facetValue, reloadProducts }}
                        />
                      );
                    })}
                  {facet.values.length > 5 && (
                    <div
                      className={
                        expanded.includes(facet.name)
                          ? 'h-max overflow-y-visible'
                          : 'h-0 overflow-y-clip'
                      }
                    >
                      {facet.values
                        .slice(5)
                        .map((facetValue: FacetValue, vkey: number) => {
                          return (
                            <FacetValueItem
                              key={vkey}
                              {...{ facet, facetValue, reloadProducts }}
                            />
                          );
                        })}
                    </div>
                  )}
                  {(expanded.includes(facet.name) ||
                    facet.values.length > 5) && (
                    <Typography
                      className='cursor-pointer font-normal hover:no-underline p-2 text-blue-700 underline'
                      onClick={() => toggleExpanded(facet.name)}
                    >
                      {expanded.includes(facet.name)
                        ? siteLabels['label.showLess']
                        : siteLabels['label.showMore']}
                    </Typography>
                  )}
                </AccordionBody>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
}

const AppliedFacets = (props: any): JSX.Element => {
  const { breadcrumbs, reloadProducts } = props;
  if (!breadcrumbs) return <></>;
  return (
    <>
      <Typography className='font-normal mb-4 pb-2 text-lg w-full'>
        Applied filters:
      </Typography>

      {breadcrumbs &&
        breadcrumbs?.map((breadcrumb: Breadcrumb, key: number) => {
          const queryValue = breadcrumb.removeQuery.query.value;
          return (
            <Button
              className='bg-gray-300 flex items-center justify-between p-2'
              color='white'
              key={key}
              onClick={() => reloadProducts(queryValue)}
              size='sm'
              variant='gradient'
            >
              {breadcrumb.facetValueName}
              <FontAwesomeIcon className='ml-3' icon={ICONS['x']} />
            </Button>
          );
        })}
    </>
  );
};

const FacetTitle = (props: any) => {
  const { facet } = props;
  return (
    <>
      <Typography className='font-bold text-base'>{facet.name}</Typography>
      <FontAwesomeIcon
        className='ml-auto'
        icon={facet.visible ? faMinus : faPlus}
      />
    </>
  );
};

const FacetValueItem = (props: any): JSX.Element => {
  const { facet, facetValue, reloadProducts } = props;
  const queryValue = facetValue.query.query.value;
  return (
    <>
      {facet.multiSelect ? (
        <Checkbox
          defaultChecked={facetValue.selected}
          label={`${facetValue.name} (${facetValue.count})`}
          onChange={() => reloadProducts(queryValue)}
          ripple={true}
        />
      ) : (
        <Typography
          className='cursor-pointer p-2'
          onClick={() => reloadProducts(queryValue)}
        >
          {facetValue.name} ({facetValue.count})
        </Typography>
      )}
    </>
  );
};
