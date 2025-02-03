export const dynamic = 'force-dynamic';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center max-w-screen-xl min-h-[32rem] mx-auto p-5 w-full'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>Return to the login screen</Link>
    </div>
  );
}
