import { Icon } from '@/components/designSystem';
import { Button } from '@material-tailwind/react';

export default function GridButton(props: any) {
  const { variant, toggleLayout } = props;

  return (
    <div className='h-12 hidden items-center md:flex px-2 w-min'>
      <Button
        className='flex h-12 justify-center w-12'
        onClick={() => toggleLayout()}
        variant='outlined'
      >
        <Icon
          iconName={variant === 'banner' ? 'border-all' : 'bars'}
          prefix='fas'
          size='2xl'
        />
      </Button>
    </div>
  );
}
