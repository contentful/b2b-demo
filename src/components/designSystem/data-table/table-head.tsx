import { DataTableColumn } from '@/models/commerce-types';
import { PREVIEW_COLS } from './data-table';

export default function TableHead(props: any) {
  const { bgcolor, cols, data, preview, siteLabels, textcolor } = props;
  return (
    <thead
      style={{
        backgroundColor: bgcolor,
        color: textcolor,
      }}
    >
      <tr className=''>
        {preview &&
          PREVIEW_COLS.map((col, key) => {
            return <th key={key}>{col}</th>;
          })}
        {data &&
          cols?.map((entry: DataTableColumn, key: number) => {
            return <th key={key}>{siteLabels[`label.${entry.key}`]}</th>;
          })}
      </tr>
    </thead>
  );
}
