export const sortTableData = (tableData: any, sort: string) => {
  const [field, dir] = sort.split('-');
  return dir === 'asc'
    ? sortTableDataAscending(tableData, field)
    : sortTableDataDescending(tableData, field);
};

export const sortTableDataAscending = (
  tableData: Array<any>,
  field: string
) => {
  if (!tableData || !field) return null;
  return tableData.sort((a: any, b: any) => {
    if (a[field] > b[field]) return 1;
    if (a[field] < b[field]) return -1;
    return 0;
  });
};

export const sortTableDataDescending = (
  tableData: Array<any>,
  field: string
) => {
  if (!tableData || !field) return null;
  return tableData.sort((a: any, b: any) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  });
};
