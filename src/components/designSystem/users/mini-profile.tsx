'use client';

import { Icon } from '@/components/designSystem';
import { useSiteLabels } from '@/hooks';
import useAppContext from '@/hooks/app-context';
import { getUser } from '@/mocks';
import { User } from '@/models/commerce-types';
import {
  Avatar,
  Button,
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ProfileDetailsModal from './profile-details-modal';

export default function MiniProfile() {
  const { state, logout } = useAppContext();
  const { currentUser: guid, currentLocale: locale } = state;
  const { siteLabels } = useSiteLabels();

  const router = useRouter();

  const [error, setError] = React.useState();
  const [user, setUser] = React.useState<User>();
  const [open, setOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  // const [showLogoutModal, setShowLogoutModal] = React.useState<boolean>();

  React.useEffect(() => {
    let isMounted = true;
    if (!guid) return;

    const loadUser = async () => {
      await getUser(guid).then((newUser) => {
        if (newUser) {
          if (isMounted) {
            setUser(newUser);
          }
        }
      });
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [state, guid]);

  const handleLogout = () => {
    // setShowLogoutModal(true);
    logout();
    router.push('/');
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleEditProfile = () => {
    setShowProfile(false);
  };

  const handleOpenProfile = () => {
    setShowProfile(true);
    // router.push('/profile');
  };

  const handleSupportLink = () => {
    router.push('/support');
  };

  const toggleOpen = () => {
    setOpen((open) => {
      return !open;
    });
  };

  return (
    <>
      {error && <div className='mx-2 text-sm'>{error}</div>}
      {user && (
        <>
          <div className='mx-2'>
            <Menu
              handler={toggleOpen}
              offset={4}
              open={open}
              placement='bottom-end'
            >
              <MenuHandler>
                <Button
                  className='flex items-center pl-3 pr-1 py-1 text-inherit'
                  variant='text'
                >
                  <Typography className='font-bold m-0 text-sm' color='inherit'>
                    {user?.name}
                  </Typography>
                  <Avatar
                    alt={user.name}
                    className='h-10 ml-2 my-0 p-0 w-10'
                    color='blue-gray'
                    src={user?.userAvatar?.url}
                    variant='circular'
                    withBorder={true}
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className='flex items-center gap-2'
                  onClick={handleOpenProfile}
                >
                  <Icon iconName='circle-user' prefix='fas' size='sm' />
                  {siteLabels['label.profile']}
                </MenuItem>
                <MenuItem className='flex items-center gap-2'>
                  <Icon iconName='gear' prefix='fas' size='sm' />
                  {siteLabels['label.editProfile']}
                </MenuItem>
                <MenuItem className='flex items-center gap-2'>
                  <Icon iconName='inbox' prefix='fas' size='sm' />
                  {siteLabels['label.inbox']}
                  {user.roles.includes('approver') && (
                    <Chip
                      className='ml-auto rounded-full px-2 text-xs text-white'
                      color='red'
                      size='sm'
                      value='2'
                      variant='filled'
                    />
                  )}
                </MenuItem>
                <MenuItem
                  className='flex items-center gap-2'
                  onClick={handleSupportLink}
                >
                  <Icon iconName='life-ring' prefix='fas' size='sm' />
                  {siteLabels['label.support']}
                </MenuItem>
                <MenuItem
                  className='flex items-center gap-2 text-red-500'
                  onClick={handleLogout}
                >
                  <Icon iconName='power-off' prefix='fas' size='sm' />
                  {siteLabels['label.signout']}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <ProfileDetailsModal
            {...{
              handleCloseProfile,
              handleEditProfile,
              handleOpenProfile,
              showProfile,
              siteLabels,
              user,
            }}
          />
        </>
      )}
      {/* <LogoutModal {...{ showLogoutModal, setShowLogoutModal }} /> */}
    </>
  );
}
