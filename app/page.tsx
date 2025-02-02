import { Experience } from '@/components/experiences';

type Params = Promise<{ slug: string[] }>;

export default async function Page({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const { slug } = await params;

  return (
    <Experience
      slug={slug ? (Array.isArray(slug) ? slug.join('/') : slug) : '/'}
      preview={true}
    />
  );
}
