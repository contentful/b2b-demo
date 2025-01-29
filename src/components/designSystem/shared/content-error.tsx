import { ICONS } from '@/components/designSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@material-tailwind/react';

export default function ContentError(error: any) {
  const { message, cause } = error;
  return (
    <Alert color='red' variant='ghost'>
      <FontAwesomeIcon icon={ICONS['exclamation-circle']} />
      {message}
    </Alert>
  );
}
