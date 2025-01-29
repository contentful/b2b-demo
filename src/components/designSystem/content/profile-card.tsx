import { EditText, ICONS } from '@/components/designSystem';
import { useAppContext } from '@/hooks';
import { getProfile } from '@/services/contentful/content';
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
import { usePathname } from 'next/navigation';
import React from 'react';

type ProfileStateType = {
  name: string;
  avatar: Asset;
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  email: string;
  socialLinks: Array<string>;
  bio: Document;
  slug: string;
};

export default function ProfileCard(props: any) {
  const preview = props.isInxExpEditorMode;
  const { state } = useAppContext();
  const pathname = usePathname();

  const [profile, setProfile] = React.useState<ProfileStateType | undefined>();

  const { border = 'false', shadow = false } = props;

  React.useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (pathname.startsWith('/authors')) {
        const pathNodes = pathname.substring(1).split('/');
        const slug = pathNodes.length > 1 && pathNodes.at(-1);
        const locale = state.currentLocale;

        if (slug) {
          getProfile(slug, locale).then((profile) => {
            if (isMounted) {
              setProfile(profile);
            }
          });
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [pathname, props]);

  return (
    <>
      {!profile ? (
        preview && <EditText type='Profile Card' />
      ) : (
        <Card
          color='white'
          shadow={shadow}
          className={`w-96 ${border !== 'false' && 'border'}`}
        >
          <CardHeader floated={false} shadow={false} className='h-80'>
            <img
              src={getContentfulImageUrl(profile?.avatar) || profile?.image}
              alt='profile-picture'
            />
          </CardHeader>

          <CardBody className='text-center'>
            <Typography variant='h4' color='blue-gray' className='mb-2'>
              {profile?.name
                ? profile?.name
                : profile?.firstName + ' ' + profile?.lastName}
            </Typography>
            {profile?.title && (
              <Typography
                color='blue-gray'
                className='font-medium'
                textGradient
              >
                {profile?.title}{' '}
                {profile?.organization && `@ ${profile?.organization}`}
              </Typography>
            )}
            {profile?.email && (
              <Typography
                color='blue-gray'
                className='font-medium'
                textGradient
              >
                {profile?.email}
              </Typography>
            )}
          </CardBody>

          <CardFooter className='flex justify-center gap-7 pt-2'>
            {profile?.links?.map((url: string, key: number) => {
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
                  <FontAwesomeIcon color={color} icon={icon} />
                </Typography>
              );
            })}
          </CardFooter>
        </Card>
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
      image: {
        displayName: 'Image',
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
      links: {
        displayName: 'Social Links',
        type: 'Array',
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

function getSocialChannelName(url: string | undefined) {
  if (!url) return 'undefined';
  const capturingRegex = /(?:facebook|twitter|instagram|linkedin|youtube)/;
  return '' + url.match(capturingRegex);
}

function getSocialIcon(channel: string | undefined): [string, any] {
  let color, icon;

  switch (channel) {
    case 'facebook':
      color = 'royalblue';
      icon = ICONS['facebook'];
      break;
    case 'instagram':
      color = 'darkviolet';
      icon = ICONS['instagram'];
      break;
    case 'linkedin':
      color = 'darkblue';
      icon = ICONS['linkedin'];
      break;
    case 'twitter':
      color = 'deepskyblue';
      icon = ICONS['twitter'];
      break;
    case 'x':
      color = 'black';
      icon = ICONS['x-twitter'];
      break;
    case 'youtube':
      color = 'firebrick';
      icon = ICONS['youtube'];
      break;
    default:
      color = 'slategray';
      icon = ICONS['arrow-up-right-from-square'];
  }

  return [color, icon];
}
