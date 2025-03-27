import { Icon } from '@/components/designSystem';
import { Alert } from '@material-tailwind/react';

export default function ContentError(error: any) {
  const { message, cause } = error;
  return (
    <Alert color='red' variant='ghost'>
      <Icon icon='exclamation-circle' prefix='fas' />
      {message}
    </Alert>
  );
}
