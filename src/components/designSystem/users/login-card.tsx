'use client';

import { useAppContext } from '@/hooks';
import { User } from '@/models/commerce-types';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginCard(props: any) {
  const router = useRouter();
  const appCtx = useAppContext();
  const { updateState } = appCtx;
  const { border, shadow, user } = props;

  const handleClick = (user: User) => {
    const newState = {
      currentLocale: user.language.isocode + '-' + user.country.code,
      currentUser: user.uid,
      currentUserRoles: user.roles,
      currentOrgUnit: user.orgUnit,
    };
    updateState(newState);
    router.push(`/${user.roles[0]}`);
  };

  return (
    <Card
      className={`${border !== 'false' && 'border'} md:w-80 w-72`}
      key={user.uid}
      shadow={shadow}
    >
      <CardHeader floated={false} className='h-80'>
        {user.userAvatar?.url && (
          <Image
            alt='avatar'
            className='h-full object-cover w-full'
            height='320'
            src={user.userAvatar?.url}
            width='320'
          />
        )}
      </CardHeader>
      <CardBody className='mt-3 px-4 py-1 text-center'>
        <div className='flex flex-row gap-8 items-center justify-center'>
          <Typography className='' color='blue-gray' variant='h4'>
            {user.firstName} {user.lastName}
          </Typography>
          {user.country.code && (
            <Image
              alt={`${user.country.code} flag`}
              className='h-6 rounded-full w-6'
              height='24'
              src={user.country?.flags?.png}
              width='24'
            />
          )}
        </div>
        <Typography color='blue' className='font-medium' variant='paragraph'>
          {user.email}{' '}
        </Typography>
        <Typography color='blue-gray' className='font-bold' textGradient>
          {user.roles?.[0].toUpperCase()}
        </Typography>
      </CardBody>
      <CardFooter className='flex justify-center gap-7 mb-3 px-4 py-1'>
        <Button
          className=''
          fullWidth
          onClick={() => handleClick(user)}
          size='lg'
          variant='gradient'
        >
          Explore the site as {user.firstName}
        </Button>
      </CardFooter>
    </Card>
  );
}

export const loginCardDefinition: ComponentDefinition = {
  component: LoginCard,
  definition: {
    id: 'login-card',
    name: 'Login Card',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Component tooltip',
    },
    variables: {
      internalId: {
        displayName: 'Internal ID',
        type: 'Text',
      },
      avatar: {
        displayName: 'Avatar',
        type: 'Media',
      },
      firstName: {
        displayName: 'First Name',
        type: 'Text',
      },
      lastName: {
        displayName: 'Last Name',
        type: 'Text',
      },
      email: {
        displayName: 'Email',
        type: 'Text',
      },
      phone: {
        displayName: 'Phone',
        type: 'Text',
      },
      company: {
        displayName: 'Company',
        type: 'Link',
      },
      role: {
        displayName: 'Role',
        type: 'Text',
      },
      country: {
        displayName: 'Country',
        type: 'Text',
      },
      border: {
        description: 'Display a border around the login card',
        displayName: 'Border',
        type: 'Text',
        defaultValue: 'false',
        group: 'style',
        validations: {
          in: [
            { displayName: 'True', value: 'true' },
            { displayName: 'False', value: 'false' },
          ],
        },
      },
      shadow: {
        description: 'Display a drop shadow under each user card',
        displayName: 'Shadow',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
    },
  },
};
