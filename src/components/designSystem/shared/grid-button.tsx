import { ICONS } from '@/components/designSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-tailwind/react';

export default function GridButton(props: any) {
  const { variant, toggleLayout } = props;

  return (
    <div className='h-12 hidden items-center lg:flex px-2 w-min'>
      <Button
        className='flex h-12 justify-center w-12'
        onClick={() => toggleLayout()}
        variant='outlined'
      >
        <FontAwesomeIcon
          size='2xl'
          icon={variant === 'banner' ? ICONS['border-all'] : ICONS['bars']}
        />
      </Button>
    </div>
  );
}
