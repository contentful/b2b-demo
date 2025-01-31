'use client';
import { useAppContext } from '@/hooks';
import { getUsers } from '@/mocks/users';
import { User } from '@/models/commerce-types';
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SignIn(props: any) {
  const { state, updateState } = useAppContext();
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<Array<User>>();

  React.useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      const mockUsers = await getUsers();

      if (mockUsers && Array.isArray(mockUsers)) {
        const sortedUsers = mockUsers?.sort((a: User, b: User) => {
          if (a.country.code > b.country.code) return -1;
          if (a.country.code < b.country.code) return 1;
          return 0;
        });
        if (isMounted) {
          setUsers(sortedUsers);
        }
      }
    };

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = (user: User) => {
    const newState = {
      currentLocale: user.language.isocode + '-' + user.country.code,
      currentUser: user.uid,
      currentUserRoles: user.roles,
      currentOrgUnit: user.orgUnit,
    };
    updateState(newState);
    router.push(`/${user.roles[0]}`);
  };

  const toggleOpen = () => {
    setOpen((open) => {
      return !open;
    });
  };

  return (
    <>
      {users && (
        <Menu
          handler={toggleOpen}
          offset={4}
          open={open}
          placement='bottom-end'
        >
          <MenuHandler>
            <Button
              className='font-normal text-inherit text-base'
              variant='text'
            >
              Sign In
            </Button>
          </MenuHandler>
          <MenuList>
            {users?.map((user: User, key: number) => {
              return (
                <MenuItem
                  className='border-b border-gray-300 nth-of-type-6:border-b-none rounded-none'
                  key={key}
                  onClick={() => handleLogin(user)}
                >
                  <SignInUser {...user} />
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </>
  );
}

const SignInUser = (user: User) => {
  return (
    <div className='flex items-center gap-4 pb-2'>
      <Avatar variant='circular' alt={user.name} src={user.userAvatar?.url} />
      <div className='flex flex-col gap-1'>
        <Typography color='gray' className='font-semibold m-0' variant='small'>
          {user.firstName}
        </Typography>
        <Typography
          className='flex font-medium items-center gap-1 m-0'
          variant='small'
        >
          {user.country.code} {user.roles?.[0]}
        </Typography>
      </div>
    </div>
  );
};
