import { Experience } from '@/components/experience';
import '@/components/studio-config';
import React from 'react';

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({
  params,
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const { expEditorMode } = await searchParams;

  return (
    <Experience
      slug={slug ? (Array.isArray(slug) ? slug.join('/') : slug) : '/'}
      expEditorMode={Boolean(expEditorMode)}
    />
  );
}
