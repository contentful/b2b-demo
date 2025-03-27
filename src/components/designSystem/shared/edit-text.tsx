import { Icon } from '@/components/designSystem';
import { Typography } from '@material-tailwind/react';

export default function EditText(props: any) {
  const { type } = props;
  return (
    <div className='bg-gray-100 border border-gray-700 flex items-center justify-center m-0 px-4 py-2 shadow-md text-inherit w-full'>
      <Icon className='mx-2' iconName='pen-to-square' size='lg' />
      <Typography className='font-bold mx-2 my-0' color='inherit'>
        Click here to edit the {type} component
      </Typography>
    </div>
  );
}
