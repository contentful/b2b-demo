import { ICONS } from '@/components/designSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-tailwind/react';

export default function EditText(props: any) {
  const { type } = props;
  return (
    <div className='bg-gray-100 border flex items-center justify-center m-0 px-4 py-2 rounded-md shadow-md text-inherit w-full'>
      <FontAwesomeIcon className='mx-2' icon={ICONS['edit']} size='lg' />
      <Typography className='font-bold mx-2 my-0' color='inherit'>
        Click here to edit the {type} component
      </Typography>
    </div>
  );
}
