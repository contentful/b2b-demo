import { DataTableColumn } from '@/models/commerce-types';
import { localizeCurrency, localizeDate } from '@/utils/locale-utils';
import Link from 'next/link';
import { PREVIEW_COLS, PREVIEW_ROWS } from './data-table';

export default function TableBody(props: any) {
  const { cols, data, locale, preview, siteLabels } = props;

  return (
    <tbody style={{ color: 'inherit' }}>
      {preview && <PreviewBody />}
      {data && <DataBody {...{ cols, data, locale, siteLabels }} />}
    </tbody>
  );
}

const PreviewBody = () => {
  return PREVIEW_ROWS.map((row, key) => {
    return (
      <tr className='border-t' key={key}>
        {PREVIEW_COLS.map((col, key2) => {
          return (
            <td
              className={`${
                key2 === 0 ? 'font-bold' : 'font-normal'
              } text-center text-inherit`}
              key={key2}
            >
              {row}
              {col !== '' && ':' + col}
            </td>
          );
        })}
      </tr>
    );
  });
};

const DataBody = (props: any) => {
  const { cols, data, locale, siteLabels } = props;
  return (
    Array.isArray(data) &&
    data?.map((tableData: Record<string, any>, key: number) => {
      return (
        <tr
          className='border-t hover:bg-gray-600 hover:cursor-pointer hover:text-white'
          key={key}
        >
          {cols?.map((col: DataTableColumn, key2: number) => {
            let val;
            switch (col.format) {
              case 'currency':
                val = localizeCurrency(locale, tableData[col.key]);
                break;
              case 'datetime':
                val = localizeDate(locale, tableData[col.key]);
                break;
              case 'label':
                val = siteLabels[`label.${tableData[col.key]}`]?.toLowerCase();
                break;
              case 'link':
                val = (
                  <Link className='lowercase text-blue-600 underline' href='#'>
                    {col.label}
                  </Link>
                );
                break;
              default:
                val = tableData[col.key];
            }
            return (
              <td className='py-1 text-center text-sm' key={key2}>
                {val}
              </td>
            );
          })}
        </tr>
      );
    })
  );
};
