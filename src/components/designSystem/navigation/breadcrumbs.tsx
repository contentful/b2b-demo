import { useSiteLabels } from '@/hooks';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const previewCrumbs = ['folder 1', 'folder 2', 'page'];

export default function Crumbs(props: any) {
  const preview = props.isInExpEditorMode;
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
      <Breadcrumbs>
        <Link href='/dashboard'>{siteLabels['label.dashboard']}</Link>
        {preview &&
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
      </Breadcrumbs>
    </>
  );
}

export const crumbsDefinition: ComponentDefinition = {
  component: Crumbs,
  definition: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Elements',
    children: 'false',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'renders a breadcrumb for navigation',
    },
    variables: {},
  },
};
