import { getUsers } from '@/mocks/users';
import { User } from '@/models/commerce-types';
import { ComponentDefinition } from '@contentful/experiences-sdk-react';
import React from 'react';
import LoginCard from './login-card';

export default function LoginCards(props: any) {
  const [users, setUsers] = React.useState<Array<User>>();

  React.useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      await getUsers()
        .then((mockUsers) => {
          if (mockUsers && Array.isArray(mockUsers)) {
            return mockUsers?.sort((a: User, b: User) => {
              if (a.country.code > b.country.code) return -1;
              if (a.country.code < b.country.code) return 1;
              return 0;
            });
          }
        })
        .then((mockUsers) => {
          if (isMounted) {
            setUsers(mockUsers);
          }
        });
    };

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='flex flex-wrap gap-5 items-start justify-center max-w-screen-xl w-full'>
      {users?.map((user: User, key: number) => {
        return <LoginCard key={key} user={user} {...props} />;
      })}
    </div>
  );
}

export const loginCardsDefinition: ComponentDefinition = {
  component: LoginCards,
  definition: {
    id: 'login-cards',
    name: 'Login Cards',
    category: 'Components',
    thumbnailUrl:
      'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    tooltip: {
      description: 'Displays a card for each demo user account',
    },
    variables: {
      border: {
        description: 'Display a border around each login card',
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
        description: 'Display a drop shadow under each login card',
        displayName: 'Shadow',
        type: 'Boolean',
        defaultValue: false,
        group: 'style',
      },
    },
  },
};
