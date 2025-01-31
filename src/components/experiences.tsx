// This must be a client component. Currently, experiences only supports client components.
'use client';

import {
  alertDefinition,
  articleCardDefinition,
  articleDefinition,
  articleListDefinition,
  avatarDefinition,
  buttonDefinition,
  crumbsDefinition,
  dataTableDefinition,
  dataWidgetDefinition,
  faqDefinition,
  faqListDefinition,
  headingDefinition,
  heroDefinition,
  infoWidgetDefinition,
  loginCardsDefinition,
  productCollectionDefinition,
  productDetailsDefinition,
  profileCardDefinition,
  promoCardDefinition,
  ratingDefinition,
  searchResultsDefinition,
  testimonialDefinition,
} from '@/components/designSystem';
import { useAppContext, useSiteConfig, useSiteLabels } from '@/hooks';
import { getSiteConfig, getSiteLabels } from '@/services/contentful/content';
import { deliveryClient, previewClient } from '@/services/contentful/client';
import {
  ExperienceRoot,
  defineComponents,
  defineDesignTokens,
  useFetchBySlug,
} from '@contentful/experiences-sdk-react';
import React from 'react';
import Loader from './loading';
import SlugRewriter from './slug-rewriter';

// The experience type id for the experience
const experienceTypeId = 'landingPage';

//Locale code for the experience (could be dynamic)
let localeCode = 'en-US';

export const Experience = ({
  slug,
  preview,
}: {
  slug: string;
  preview: true;
}) => {
  const { state } = useAppContext();
  const { siteConfig, setSiteConfig } = useSiteConfig();
  const { siteLabels, setSiteLabels } = useSiteLabels();

  React.useEffect(() => {
    let isMounted = true;
    localeCode = state.currentLocale ? state.currentLocale : localeCode;

    const loadSiteConfig = async () => {
      getSiteConfig(localeCode).then((config) => {
        if (isMounted) {
          setSiteConfig(config);
        }
      });
    };

    const loadSiteLabels = async () => {
      getSiteLabels(localeCode).then((labels) => {
        if (isMounted) {
          setSiteLabels(labels);
        }
      });
    };

    // only fetch the configs if the locale has changed
    if (localeCode !== siteConfig.locale) loadSiteConfig();
    if (localeCode !== siteLabels.locale) loadSiteLabels();

    return () => {
      isMounted = false;
    };
  }, [state, slug, siteConfig, setSiteConfig, siteLabels, setSiteLabels]);

  const contentSlug = new SlugRewriter(state.currentUserRoles).process(slug);

  const { experience, isLoading, error } = useFetchBySlug({
    slug: contentSlug,
    localeCode,
    client: preview ? previewClient : deliveryClient,
    experienceTypeId,
  });

  return (
    <>
      {error ? (
        <div className='bg-red-100 w-full py-24 rounded-lg text-center'>
          Error: {(error as any).message}
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        experience && (
          <ExperienceRoot experience={experience} locale={localeCode} />
        )
      )}
    </>
  );
};

// Define the components for the experience
// @see https://github.com/contentful/experience-builder/wiki#register-your-component
defineComponents(
  [
    alertDefinition,
    articleCardDefinition,
    articleDefinition,
    articleListDefinition,
    avatarDefinition,
    buttonDefinition,
    crumbsDefinition,
    dataTableDefinition,
    dataWidgetDefinition,
    faqDefinition,
    faqListDefinition,
    headingDefinition,
    heroDefinition,
    infoWidgetDefinition,
    loginCardsDefinition,
    productCollectionDefinition,
    productDetailsDefinition,
    profileCardDefinition,
    promoCardDefinition,
    ratingDefinition,
    searchResultsDefinition,
    testimonialDefinition,
  ]
  // Basic components can be disabled by passing an empty array to  enabledBuiltInComponents
  // Or selectively enabled by passing an array of component ids
  // @see https://github.com/contentful/experience-builder/wiki/Component-Registration#disabling-all-built-in-components
  // {
  //   enabledBuiltInComponents: [],
  // }
);

// Define the tokens for the experience
// @see https://github.com/contentful/experience-builder/wiki#registering-design-tokens
defineDesignTokens({
  spacing: {
    XS: 'xs', //'0.25rem',
    SM: 'sm', //'0.5rem',
    MD: 'md', //'1rem',
    LG: 'lg', //'1.5rem',
    XL: 'xl', //'2rem',
    XXL: '2xl', //'3rem',
  },
  sizing: {
    XS: 'xs', //'16px',
    SM: 'sm', //'100px',
    MD: 'md', //'300px',
    LG: 'lg', //'600px',
    XL: 'xl', //'1024px'
  },
  color: {
    // inherit: 'inherit',
    black: 'black',
    white: 'white',
    'slate-gray': 'slategray', //'#607d8b',
    gray: 'gray', //'#9e9e9e',
    brown: 'brown', //'#795548',
    pink: 'pink', //'#e91e63',
    red: 'red', //'#f44336',
    'dark-orange': 'darkorange', //'#ff5722',
    orange: 'orange', //'#ff9800',
    amber: 'gold', //'#ffc107',
    yellow: 'yellow', //'#ffeb3b',
    lime: 'lime', //'#cddc39',
    'light-green': 'lightgreen', //'#8bc34a',
    green: 'green', //'#4caf50',
    teal: 'teal', //'#009688',
    cyan: 'cyan', //'#00bcd4',
    'light-blue': 'lightblue', //'#03a9f4',
    blue: 'blue', //'#2196f3',
    indigo: 'indigo', //'#3f51b5',
    'deep-purple': 'rebeccapurple', //'#673ab7',
    purple: 'purple', //'#9c27b0',
  },
  border: {
    black: {
      width: '1px',
      style: 'solid',
      color: 'black',
    },
    white: {
      width: '1px',
      style: 'solid',
      color: 'white',
    },
    'slate-gray': {
      width: '1px',
      style: 'solid',
      color: 'slategray',
    },
    gray: {
      width: '1px',
      style: 'solid',
      color: 'gray',
    },
    brown: {
      width: '1px',
      style: 'solid',
      color: 'brown',
    },
    pink: {
      width: '1px',
      style: 'solid',
      color: 'pink',
    },
    red: {
      width: '1px',
      style: 'solid',
      color: 'red',
    },
    'dark-orange': {
      width: '1px',
      style: 'solid',
      color: 'darkorange',
    },
    orange: {
      width: '1px',
      style: 'solid',
      color: 'orange',
    },
    amber: {
      width: '1px',
      style: 'solid',
      color: 'gold',
    },
    yellow: {
      width: '1px',
      style: 'solid',
      color: 'yellow',
    },
    lime: {
      width: '1px',
      style: 'solid',
      color: 'lime',
    },
    'light-green': {
      width: '1px',
      style: 'solid',
      color: 'lightgreen',
    },
    green: {
      width: '1px',
      style: 'solid',
      color: 'green',
    },
    teal: {
      width: '1px',
      style: 'solid',
      color: 'teal',
    },
    cyan: {
      width: '1px',
      style: 'solid',
      color: 'cyan',
    },
    'light-blue': {
      width: '1px',
      style: 'solid',
      color: 'lightblue',
    },
    blue: {
      width: '1px',
      style: 'solid',
      color: 'blue',
    },
    indigo: {
      width: '1px',
      style: 'solid',
      color: 'indigo',
    },
    'deep-purple': {
      width: '1px',
      style: 'solid',
      color: 'rebeccapurple',
    },
    purple: {
      width: '1px',
      style: 'solid',
      color: 'purple',
    },
  },
  fontSize: {
    XS: '0.75rem',
    SM: '0.825rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
  },
  textColor: {
    // inherit: 'inherit',
    black: 'black',
    white: 'white',
    'slate-gray': 'slategray', //'#607d8b',
    gray: 'gray', //'#9e9e9e',
    brown: 'brown', //'#795548',
    pink: 'pink', //'#e91e63',
    red: 'red', //'#f44336',
    'dark-orange': 'darkorange', //'#ff5722',
    orange: 'orange', //'#ff9800',
    amber: 'gold', //'#ffc107',
    yellow: 'yellow', //'#ffeb3b',
    lime: 'lime', //'#cddc39',
    'light-green': 'lightgreen', //'#8bc34a',
    green: 'green', //'#4caf50',
    teal: 'teal', //'#009688',
    cyan: 'cyan', //'#00bcd4',
    'light-blue': 'lightblue', //'#03a9f4',
    blue: 'blue', //'#2196f3',
    indigo: 'indigo', //'#3f51b5',
    'deep-purple': 'rebeccapurple', //'#673ab7',
    purple: 'purple', //'#9c27b0',
  },
});
