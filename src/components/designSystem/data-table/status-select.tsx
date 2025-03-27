import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import Icon from '../content/icon';

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
        <PopoverHandler className='bg-white flex lowercase justify-between m-0 px-2 py-0 rounded-md w-36'>
          <Button
            className='flex hover:shadow-none items-center'
            color='gray'
            ripple={false}
            variant='outlined'
          >
            <Typography
              as='span'
              className='font-normal m-0 p-0 text-base w-fit'
            >
              {siteLabels['label.' + filter]}
            </Typography>
            <Icon
              className='ml-auto mt-1'
              iconName={sortOpen ? 'angle-up' : 'angle-down'}
              prefix='fas'
              size='lg'
            />
          </Button>
        </PopoverHandler>
        <PopoverContent className='m-0 p-0 rounded-none w-36'>
          <List className='m-0 p-0 w-36'>
            {sortOptions?.map((opt: any, key: number) => {
              return (
                <ListItem
                  className='focus:bg-inherit m-0 px-2 py-1 rounded-none w-36'
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
