'use client';

import { ICONS } from '@/components/designSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup } from '@material-tailwind/react';
import React from 'react';

const MAX_BUTTONS = 5;

export default function Pagination(props: any) {
  const [buttons, setButtons] = React.useState<any>();
  const { handleChangePage, pagination } = props;
  const { currentPage, totalPages } = pagination;

  React.useEffect(() => {
    let isMounted = true;

    const loadButtons = () => {
      const currentPageNumber = currentPage + 1;
      const btnCount = totalPages <= MAX_BUTTONS ? totalPages : MAX_BUTTONS - 2;
      const numberedButtons = new Array(btnCount);

      const start =
        totalPages <= MAX_BUTTONS
          ? 1
          : currentPageNumber < btnCount
          ? 1
          : currentPageNumber === totalPages
          ? totalPages + 1 - btnCount
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
    return currentPage === page;
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const firstPageButton = (
    <Button
      className={`flex font-normal h-12 ${
        !isFirstPage && 'hover:bg-gray-200'
      } items-center justify-center text-md w-12`}
      disabled={isFirstPage}
      onClick={() => handleChangePage(0)}
    >
      <FontAwesomeIcon icon={ICONS['angle-double-left']} />
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
      <FontAwesomeIcon icon={ICONS['angle-double-right']} />
    </Button>
  );

  return (
    <div className='flex h-12 items-center lg:mx-0  mx-auto px-2 w-max'>
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
          if (totalPages <= MAX_BUTTONS && key == 0) {
            className = className + ' border-w rounded-w-sm';
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
