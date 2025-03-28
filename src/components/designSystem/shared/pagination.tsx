'use client';

import { Icon } from '@/components/designSystem';
import { Button, ButtonGroup } from '@material-tailwind/react';
import React from 'react';

const MAX_BUTTONS = 5;

export default function Pagination(props: any) {
  const [buttons, setButtons] = React.useState<any>();
  const { handleChangePage, pagination } = props;

  React.useEffect(() => {
    let isMounted = true;

    const loadButtons = () => {
      const currentPageNumber = pagination.currentPage + 1;
      const btnCount =
        pagination.totalPages <= MAX_BUTTONS
          ? pagination.totalPages
          : MAX_BUTTONS - 2;
      const numberedButtons = new Array(btnCount);

      const start =
        pagination.totalPages <= MAX_BUTTONS
          ? 1
          : currentPageNumber < btnCount
          ? 1
          : currentPageNumber === pagination.totalPages
          ? pagination.totalPages + 1 - btnCount
          : currentPageNumber - 1;

      for (var i = start; i < start + btnCount; i++) {
        numberedButtons.push({ label: `${i}`, value: i - 1 });
      }

      if (isMounted) {
        setButtons(numberedButtons);
      }
    };

    loadButtons();

    return () => {
      isMounted = false;
    };
  }, [pagination]);

  const isCurrentPage = (page: number): boolean => {
    return pagination.currentPage === page;
  };

  const isFirstPage = pagination.currentPage === 0;
  const isLastPage = pagination.currentPage === pagination.totalPages - 1;

  const firstPageButton = (
    <Button
      className={`flex font-normal h-12 ${
        !isFirstPage && 'hover:bg-gray-200'
      } items-center justify-center text-md w-12`}
      disabled={isFirstPage}
      onClick={() => handleChangePage(0)}
    >
      <Icon iconName='angles-left' prefix='fas' />
    </Button>
  );

  const lastPageButton = (
    <Button
      className={`flex font-normal h-12 ${
        !isLastPage && 'hover:bg-gray-200'
      } items-center justify-center text-md w-12`}
      disabled={isLastPage}
      onClick={() => handleChangePage(pagination.totalPages - 1)}
    >
      <Icon iconName='angles-right' prefix='fas' />
    </Button>
  );

  return (
    <div className='flex h-12 items-center md:mx-0  mx-auto px-2 w-max'>
      <ButtonGroup size='md' variant='outlined'>
        {firstPageButton}

        {buttons?.map((button: any, key: number) => {
          let className =
            'flex font-normal h-12 items-center justify-center text-md w-12';

          if (isCurrentPage(button.value)) {
            className = className + ' bg-blue-900 text-white';
          } else {
            className = className + ' hover:bg-gray-200';
          }
          if (pagination.totalPages <= MAX_BUTTONS && key == 0) {
            className = className + ' border rounded-md';
          }

          return (
            <Button
              className={className}
              disabled={isCurrentPage(button.value)}
              key={key}
              onClick={() => {
                handleChangePage(button.value);
              }}
            >
              {button.label}
            </Button>
          );
        })}

        {lastPageButton}
      </ButtonGroup>
    </div>
  );
}
