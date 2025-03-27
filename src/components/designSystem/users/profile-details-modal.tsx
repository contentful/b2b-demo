import { Icon } from '@/components/designSystem';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';

export default function ProfileDetailsModal(props: any) {
  const {
    handleCloseProfile,
    handleEditProfile,
    handleOpenProfile,
    showProfile,
    siteLabels,
    user,
  } = props;

  return (
    <Dialog
      className='rounded-none'
      handler={handleOpenProfile}
      open={showProfile}
      size='sm'
    >
      <DialogHeader className='bg-amber-500 font-[Inter,"Inter Fallback"] py-2'>
        {siteLabels['label.userProfile']}
      </DialogHeader>
      <DialogBody className='font-[Inter,"Inter Fallback"]'>
        <div className='flex gap-6 items-start w-full'>
          <div className='h-40 w-40'>
            <Image
              alt='avatar'
              className='h-full object-cover rounded-full w-full'
              height='0'
              sizes='10rem'
              src={user?.userAvatar?.url}
              width='0'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Typography
                as='h3'
                className='font-[Inter,"Inter Fallback"] m-0'
                color='inherit'
                variant='h3'
              >
                {user?.name}
              </Typography>
              <Typography
                as='p'
                className='font-[Inter,"Inter Fallback"] m-0 text-small'
                color='inherit'
                variant='small'
              >
                {user?.orgUnit}
              </Typography>
              <Typography
                as='p'
                className='font-[Inter,"Inter Fallback"] font-semibold m-0 uppercase'
                color='inherit'
                variant='small'
              >
                {user?.roles
                  .map((role: string) => {
                    return siteLabels['label.' + role.toLowerCase()];
                  })
                  .join(', ')}
              </Typography>
            </div>

            <div className='border-t'></div>

            <div className='flex flex-col gap-2'>
              <Typography as='p' color='inherit' className='font-normal m-0'>
                <Icon className='mr-3' iconName='envelope' prefix='fas' />
                {user?.email}
              </Typography>
              <Typography as='p' color='inherit' className='font-normal m-0'>
                <Icon className='mr-3' iconName='globe' prefix='fas' />
                {user?.language.isocode}-{user?.country.code}
              </Typography>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='py-2'>
        <Button onClick={handleEditProfile} variant='text'>
          {siteLabels['label.editProfile']}
        </Button>
        <Button className='ml-2' onClick={handleCloseProfile} variant='filled'>
          {siteLabels['label.close']}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
