import { DataTableColumn } from '@/models/commerce-types';
import { PREVIEW_COLS } from './data-table';
import {
  TailwindBgColorsMap,
  TailwindTextColorsMap,
} from '@/utils/tailwind-colors-utils';

export default function TableHead(props: any) {
  const {
    cellpadding = 'py-2',
    cols,
    data,
    headbg,
    headtext,
    preview,
    siteLabels,
  } = props;

  const border = headbg !== 'black' ? 'border-b' : '';
  const bgcolor = !['black', 'white', 'inherit'].includes(headbg)
    ? headbg + '-500'
    : headbg;
  const textcolor = !['black', 'white', 'inherit'].includes(headtext)
    ? headtext + '-500'
    : headtext;

  return (
    <thead
      className={`${TailwindBgColorsMap[bgcolor]} ${border} ${TailwindTextColorsMap[textcolor]}`}
    >
      <tr className=''>
        {preview &&
          PREVIEW_COLS.map((col, key) => {
            return (
              <th className={cellpadding} key={key}>
                {col}
              </th>
            );
          })}
        {data &&
          cols?.map((entry: DataTableColumn, key: number) => {
            return (
              <th className={cellpadding} key={key}>
                {siteLabels[`label.${entry.key}`]}
              </th>
            );
          })}
      </tr>
    </thead>
  );
}
