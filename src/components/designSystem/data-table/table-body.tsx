import { DataTableColumn } from '@/models/commerce-types';
import { localizeCurrency, localizeDate } from '@/utils/locale-utils';
import { TailwindBgColorsMap } from '@/utils/tailwind-colors-utils';
import Link from 'next/link';
import { PREVIEW_COLS, PREVIEW_ROWS } from './data-table';

export default function TableBody(props: any) {
  const {
    cellpadding = 'py-2',
    cols,
    data,
    handleOpenDetails,
    headbg,
    locale,
    preview,
    siteLabels,
  } = props;

  let bgcolor;
  if (
    !['black', 'gray', 'lime', 'white', 'yellow', 'inherit'].includes(headbg)
  ) {
    bgcolor = headbg + '-' + 50;
  } else {
    bgcolor = ['lime', 'yellow'].includes(headbg)
      ? headbg + '-100'
      : 'gray-100';
  }

  return (
    <tbody style={{ color: 'inherit' }}>
      {preview && <PreviewBody {...{ bgcolor, cellpadding }} />}
      {data && (
        <DataBody
          {...{
            bgcolor,
            cellpadding,
            cols,
            data,
            handleOpenDetails,
            locale,
            siteLabels,
          }}
        />
      )}
    </tbody>
  );
}

const PreviewBody = (props: any) => {
  const { bgcolor, cellpadding } = props;
  return PREVIEW_ROWS.map((row, key) => {
    return (
      <tr
        className={`${TailwindBgColorsMap[bgcolor]} mx-1 odd:bg-inherit`}
        key={key}
      >
        {PREVIEW_COLS.map((col, key2) => {
          return (
            <td
              className={`${
                key2 === 0 ? 'font-bold' : 'font-normal'
              } ${cellpadding} text-center text-inherit`}
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
  const {
    bgcolor,
    cellpadding,
    cols,
    data,
    handleOpenDetails,
    locale,
    siteLabels,
  } = props;

  return (
    Array.isArray(data) &&
    data?.map((tableData: Record<string, any>, key: number) => {
      return (
        <tr
          className={`${TailwindBgColorsMap[bgcolor]} hover:cursor-pointer last:rounded-b-md odd:bg-inherit rounded-b-none`}
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
                  <Link
                    className='lowercase text-blue-600 underline'
                    href='#'
                    onClick={() => handleOpenDetails(tableData[col.key])}
                  >
                    {tableData[col.key]}
                  </Link>
                );
                break;
              default:
                val = tableData[col.key];
            }
            return (
              <td className={`${cellpadding} text-center text-sm`} key={key2}>
                {val}
              </td>
            );
          })}
        </tr>
      );
    })
  );
};
