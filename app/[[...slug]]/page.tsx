import { Experience } from '@/components/experiences';
import { Params } from 'next/dist/server/request/params';

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
