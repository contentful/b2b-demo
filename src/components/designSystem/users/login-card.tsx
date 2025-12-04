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
  const { user } = props;

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
      className='border-none md:w-80 rounded-none w-72'
      key={user.uid}
      shadow={false}
    >
      <CardHeader floated={false} className='h-80 rounded-none'>
        {user.userAvatar?.url && (
          <Image
            alt='avatar'
            className='h-full object-cover w-full'
            height='0'
            sizes='20rem'
            src={user.userAvatar?.url}
            width='0'
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
              height='0'
              sizes='1.5rem'
              src={user.country?.flags?.png}
              width='0'
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
  id: 'login-card',
  name: 'Login Card',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/3f0c2nKdZlCXIr1LDz0qAT/298b9b5fd1d5b6f9aa771566f1b4f285/login_card.svg',
  tooltip: {
    description: 'Component tooltip',
  },
  builtInStyles: [
    'cfBackgroundColor',
    'cfBorder',
    'cfBorderRadius',
    'cfFontSize',
    'cfLetterSpacing',
    'cfLineHeight',
    'cfMargin',
    'cfMaxWidth',
    'cfPadding',
    'cfTextAlign',
    'cfTextColor',
    'cfTextTransform',
    'cfWidth',
  ],
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
  },
};
