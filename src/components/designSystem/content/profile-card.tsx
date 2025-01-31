import { EditText, ICONS } from '@/components/designSystem';
import { useAppContext } from '@/hooks';
import { getProfile } from '@/services/contentful/content';
import { getSocialChannelName, getSocialIcon } from '@/utils/content-utils';
import { getContentfulImageUrl } from '@/utils/image-utils';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const preview = props.isInExpEditorMode;
  const { state } = useAppContext();
  const pathname = usePathname();

  const [profile, setProfile] = React.useState<any>({
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
    setProfile({
      name: props?.name,
      firstName: props?.firstName,
      lastName: props?.lastName,
      avatar: props.avatar,
      organization: props?.organization,
      title: props?.title,
      email: props?.email,
      socialLinks: props?.socialLinks,
      slug: props?.slug,
    });
  }, [props]);

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
        preview && <EditText type='Profile Card' />
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
  component: ProfileCard,
  definition: {
    id: 'profile-card',
    name: 'Profile Card',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Component tooltip',
    },
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
            src={getContentfulImageUrl(profile?.avatar)!}
            alt='profile-picture'
            height='384'
            width='384'
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
              <FontAwesomeIcon color={color} icon={icon} size='xl' />
            </Typography>
          );
        })}
      </CardFooter>
    </Card>
  );
};
