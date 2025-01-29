import { ICONS } from '@/components/designSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';

export default function StatusSelect(props: any) {
  const {
    filter,
    handleOptionClick,
    setSortOpen,
    siteLabels,
    sortOpen,
    sortOptions,
  } = props;

  return (
    <div className='w-36'>
      <Popover open={sortOpen} handler={setSortOpen} placement='bottom-end'>
        <PopoverHandler className='flex lowercase justify-between m-0 px-2 py-0 rounded-sm w-36'>
          <Button
            className='flex hover:shadow-none items-center'
            color='white'
            ripple={false}
            variant='filled'
          >
            <Typography
              as='span'
              className='font-normal m-0 p-0 text-base w-fit'
            >
              {siteLabels['label.' + filter]}
            </Typography>
            <FontAwesomeIcon
              className='ml-auto mt-1'
              icon={sortOpen ? ICONS['angle-up'] : ICONS['angle-down']}
              size='lg'
            />
          </Button>
        </PopoverHandler>
        <PopoverContent className='m-0 p-0 rounded-none w-36'>
          <List className='m-0 p-0 w-36'>
            {sortOptions?.map((opt: any, key: number) => {
              return (
                <ListItem
                  className='focus:bg-inherit m-0 px-2 py-1 rounded-none w-32'
                  key={key}
                  onClick={() => handleOptionClick(opt?.toLowerCase())}
                  ripple={false}
                >
                  {siteLabels['label.' + opt]?.toLowerCase()}
                </ListItem>
              );
            })}
          </List>
        </PopoverContent>
      </Popover>
    </div>
  );
}
