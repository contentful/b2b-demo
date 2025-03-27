'use client';
import { useEditMode, useSiteLabels } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Breadcrumbs as Crumbs } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const previewCrumbs = ['folder 1', 'folder 2', 'page'];

export default function Breadcrumbs(props: any) {
  const { editMode } = useEditMode();
  const { siteLabels } = useSiteLabels();
  const pathname = usePathname();
  const crumbs = pathname.substring(1).split('/');

  const buildUrlForCrumb = (idx: number) => {
    let url = '';
    crumbs.forEach((crumb, key) => {
      if (key <= idx) {
        url = url + '/' + crumbs[key];
      }
    });
    return url;
  };

  return (
    <>
      <Crumbs className='bg-transparent'>
        <Link href='/dashboard'>{siteLabels['label.dashboard']}</Link>
        {editMode &&
          previewCrumbs.map((crumb: string, key: number) => {
            return (
              <Link href='#' key={key}>
                {crumb}
              </Link>
            );
          })}
        {crumbs.map((crumb: string, key: number) => {
          const url = buildUrlForCrumb(key);
          return (
            <Link href={url} key={key}>
              {siteLabels[crumb] || decodeURIComponent(crumb)}
            </Link>
          );
        })}
      </Crumbs>
    </>
  );
}

export const breadcrumbsDefinition: ComponentDefinition = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'Elements',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/693vKsW5QrtTKnMsmyNl1R/2def409181f92b5ed64037ac00867f90/ellipsis-solid.svg?h=32&w=32',
  tooltip: {
    description: 'renders a breadcrumb for navigation',
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
  variables: {},
};
