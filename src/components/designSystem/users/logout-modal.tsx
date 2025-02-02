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

  let intervalId = React.useRef<NodeJS.Timeout | null>(null);

  const reduceSecondsRemaining = React.useCallback(() => {
    setSecondsRemaining((sr) => sr - 1);
  }, []);

  React.useEffect(() => {
    if (showLogoutModal) {
      if (!intervalId.current) {
        intervalId.current = setInterval(reduceSecondsRemaining, 1000);
      }

      if (secondsRemaining < 1) {
        clearInterval(intervalId.current);
        intervalId.current = null;
        setShowLogoutModal(false);
        router.push('/');
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [
    showLogoutModal,
    setShowLogoutModal,
    secondsRemaining,
    reduceSecondsRemaining,
    router,
  ]);

  const toggleShowLogoutModal = () => {
    setShowLogoutModal((state: boolean) => !state);
  };

  return (
    <Dialog handler={toggleShowLogoutModal} open={showLogoutModal} size='xs'>
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
