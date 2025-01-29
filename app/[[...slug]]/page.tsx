import { Experience } from '@/components/experiences';

const Page = async ({
  params,
}: {
  params: { slug: string[] };
}): Promise<JSX.Element> => {
  const { slug } = await params;

  return <Experience slug={slug?.join('/') || '/'} preview={true} />;
};

export default Page;
