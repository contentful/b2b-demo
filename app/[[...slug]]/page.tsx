import { Experience } from '@/components/experiences';

type Params = Promise<{ slug: string[] }>;

const Page = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  const { slug } = await params;

  return (
    <Experience
      slug={slug ? (Array.isArray(slug) ? slug.join('/') : slug) : '/'}
      preview={true}
    />
  );
};

export default Page;
