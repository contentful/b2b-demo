'use client';
import { EditText, Icon } from '@/components/designSystem';
import { useAppContext, useEditMode } from '@/hooks';
import { getProfile } from '@/services/contentful/content';
import { getSocialChannelName, getSocialIcon } from '@/utils/content-utils';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { Asset } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type ProfileStateType = {
  name?: string;
  avatar?: Asset | string;
  firstName?: string;
  lastName?: string;
  title?: string;
  organization?: string;
  email?: string;
  socialLinks?: Array<string>;
  slug?: string;
};

export default function ProfileCard(props: any) {
  const { editMode } = useEditMode();
  const { state } = useAppContext();
  const pathname = usePathname();

  const [profile, setProfile] = React.useState<ProfileStateType>({
    avatar: props.avatar,
    email: props?.email,
    firstName: props?.firstName,
    lastName: props?.lastName,
    name: props?.name,
    organization: props?.organization,
    slug: props?.slug,
    socialLinks: props?.socialLinks,
    title: props?.title,
  });

  const { border = 'false', shadow = false } = props;

  React.useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (pathname.startsWith('/authors')) {
        const pathNodes = pathname.substring(1).split('/');
        const slug = pathNodes.length > 1 && pathNodes.at(-1);
        const locale = state.currentLocale;

        if (slug) {
          await getProfile(slug, locale).then((profileFromPath) => {
            if (isMounted) {
              setProfile(profileFromPath);
            }
          });
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [pathname, state]);

  const profileIsDefined = () => {
    return (
      typeof profile?.name === 'string' ||
      typeof profile?.firstName === 'string' ||
      typeof profile?.lastName === 'string' ||
      typeof profile?.avatar === 'string' ||
      typeof profile?.organization === 'string' ||
      typeof profile?.title === 'string' ||
      typeof profile?.email === 'string' ||
      (Array.isArray(profile?.socialLinks) && profile.socialLinks.length > 0)
    );
  };

  return (
    <>
      {!profileIsDefined() ? (
        editMode && <EditText type='Profile Card' />
      ) : profile.slug ? (
        <Link href={'/profiles/' + profile.slug}>
          <PCard {...{ border, shadow, profile }} />
        </Link>
      ) : (
        <PCard {...{ border, shadow, profile }} />
      )}
    </>
  );
}

export const profileCardDefinition: ComponentDefinition = {
  id: 'profile-card',
  name: 'Profile Card',
  category: 'Components',
  thumbnailUrl:
    'https://images.ctfassets.net/yv5x7043a54k/2ZbL7wcjvIq4GMLImnJH7N/ee80dd04b4b3c7eb0299b412f8bd273d/profile_card.svg',
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
    name: {
      displayName: 'Name',
      type: 'Text',
    },
    firstName: {
      displayName: 'First Name',
      type: 'Text',
    },
    lastName: {
      displayName: 'Last Name',
      type: 'Text',
    },
    avatar: {
      displayName: 'Avatar',
      type: 'Media',
    },
    organization: {
      displayName: 'Organization',
      type: 'Text',
    },
    title: {
      displayName: 'Title',
      type: 'Text',
    },
    email: {
      displayName: 'Email',
      type: 'Text',
    },
    socialLinks: {
      displayName: 'Social Links',
      type: 'Array',
    },
    slug: {
      displayName: 'Slug',
      type: 'Text',
      group: 'content',
    },
    border: {
      description: 'Display a border around the profile card',
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
      description: 'Display a drop shadow under the profile card',
      displayName: 'Shadow',
      type: 'Boolean',
      defaultValue: false,
      group: 'style',
    },
  },
};

const PCard = (props: any) => {
  const { border, shadow, profile } = props;
  return (
    <Card
      color='white'
      shadow={shadow}
      className={`w-96 ${border !== 'false' && 'border'}`}
    >
      {profile.avatar && (
        <CardHeader floated={false} shadow={false} className='h-80'>
          <Image
            alt={`photo of ${profile?.name}`}
            height='0'
            sizes='24rem'
            src={getContentfulImageUrl(profile?.avatar)!}
            width='0'
          />
        </CardHeader>
      )}

      <CardBody className='text-center'>
        <Typography variant='h4' color='blue-gray' className='mb-2'>
          {profile?.name && profile?.name}
          {!profile?.name && profile?.firstName && profile?.firstName}
          {!profile?.name && profile?.lastName && ' ' + profile.lastName}
        </Typography>
        {(profile?.title || profile?.organization) && (
          <Typography color='blue-gray' className='font-medium' textGradient>
            {profile?.title}
            {profile?.organization && ` @ ${profile?.organization}`}
          </Typography>
        )}
        {profile?.email && (
          <Typography color='blue-gray' className='font-medium' textGradient>
            {profile?.email}
          </Typography>
        )}
      </CardBody>

      <CardFooter className='flex justify-center gap-4 pt-2'>
        {profile?.socialLinks?.map((url: string, key: number) => {
          const channel = getSocialChannelName(url);
          const [color, icon] = getSocialIcon(channel);

          return (
            <Typography
              as='a'
              href={url}
              variant='lead'
              color='blue'
              textGradient
              target='blank'
              key={key}
            >
              <Icon
                color={color}
                iconName={icon}
                prefix='fa-brands'
                size='xl'
              />
            </Typography>
          );
        })}
      </CardFooter>
    </Card>
  );
};
