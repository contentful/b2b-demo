import { useSiteLabels } from '@/hooks';
import { formatMessage } from '@/utils/string-utils';
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutModal(props: any) {
  const { showLogoutModal, setShowLogoutModal } = props;
  const { siteLabels } = useSiteLabels();
  const router = useRouter();

  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(5);

  let intervalId: NodeJS.Timeout | null;

  React.useEffect(() => {
    if (showLogoutModal) {
      if (!intervalId) {
        intervalId = setInterval(reduceSecondsRemaining, 1000);
      }

      if (secondsRemaining < 1) {
        clearInterval(intervalId);
        intervalId = null;
        closeModal();
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [showLogoutModal, secondsRemaining]);

  const reduceSecondsRemaining = () => {
    setSecondsRemaining(secondsRemaining - 1);
  };

  const closeModal = () => {
    setShowLogoutModal(false);
    router.push('/');
  };

  return (
    <Dialog open={showLogoutModal} size='xs'>
      <DialogHeader>{siteLabels['label.logoutSuccessful']}</DialogHeader>
      <DialogBody>
        <Typography>
          {formatMessage(
            siteLabels['message.logoutRedirect'],
            '' + secondsRemaining
          )}
        </Typography>
      </DialogBody>
    </Dialog>
  );
}
