import * as React from "react";

export type Ordering = "asc" | "desc" | null;

interface Header<Data = Record<string, any>> {
  title?: React.ReactNode;
  orderDirection?: Ordering;
  onOrderChange?: (sorting: Ordering) => void;
  render?: (item: Data) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hidden?: boolean;
  isFilter?: boolean;
  isHidden?: boolean;
}

export interface TableProps<Data = Record<string, any>> {
  className?: string;
  style?: React.CSSProperties;

  loading?: boolean;
  refreshing?: boolean;

  columns: Header<Data>[];
  data?: Data[];
  index?: keyof Data;

  onRowClick?: (item: Data) => void;
  onRowHover?: (item: Data) => void;
  onRowBlur?: (item: Data) => void;
}

// eslint-disable-next-line react/function-component-definition
function Table<Data = Record<string, any>>({
  className,
  style,
  index = "id" as keyof Data,
  loading = false,
  refreshing = false,
  columns,
  data = [],
  onRowClick,
  onRowHover = () => null,
  onRowBlur = () => null,
}: TableProps<Data>) {
  const nextSortOrder = (current?: Ordering) => {
    if (current === "asc") {
      return "desc";
    }
    return "asc";
  };
  const renderHeader = () => (
    <tr className="bg-gray-50 border-t border-b border-gray-200 text-xs font-medium uppercase text-gray-500 tracking-wider">
      {columns
        .filter((_) => !_.hidden)
        .map(
          (
            {
              title,
              onOrderChange,
              orderDirection,
              style: headerStyle,
              className: headerClassName,
              isHidden = false,
            },
            idx
          ) => (
            // eslint-disable-next-line react/no-array-index-key
            <th
              key={idx}
              className={`px-4 py-3 ${headerClassName} ${headerStyle}`}
            >
              {onOrderChange ? (
                <button
                  type="button"
                  onClick={() => onOrderChange(nextSortOrder(orderDirection))}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{title}</span>
                  {orderDirection === "asc" && <span>▲</span>}
                  {orderDirection === "desc" && <span>▼</span>}
                </button>
              ) : (
                <div>
                  <span>{title}</span>
                </div>
              )}
            </th>
          )
        )}
    </tr>
  );

  const renderData = () =>
    data.map((entry) => (
      <tr
        key={entry[index] as string}
        className={`border-b border-gray-200 hover:bg-gray-100 ${
          onRowClick ? "cursor-pointer" : ""
        }`}
        onClick={() => (onRowClick ? onRowClick(entry) : () => null)}
        onMouseOver={() => onRowHover(entry)}
        onMouseLeave={() => onRowBlur(entry)}
        onFocus={() => onRowHover(entry)}
      >
        {columns
          .filter((_) => !_.hidden)
          .map(({ render }, idx, cols) => {
            const value = render ? render(entry) : null;

            // eslint-disable-next-line react/no-array-index-key
            return (
              <td key={idx} className={`px-4 py-3 text-center`}>
                <div className="flex items-center">{value}</div>
              </td>
            );
          })}
      </tr>
    ));

  const renderEmpty = () => (
    <tbody>
      <tr>
        <td
          colSpan={columns.length}
          className="border-t border-b border-gray-200 text-center py-8 text-gray-500 font-medium"
        >
          <div>
            <p>There is no data to display</p>
          </div>
        </td>
      </tr>
    </tbody>
  );

  const renderLoading = () => (
    <tbody>
      <tr>
        <td
          colSpan={columns.length}
          className="border-t border-b border-gray-200 text-center py-8"
        >
          <div>Loading</div>
        </td>
      </tr>
    </tbody>
  );

  return (
    <div
      className={`w-full overflow-x-auto relative ${className} ${
        refreshing && !loading ? "refreshing" : ""
      }`}
      style={style}
    >
      <table className="w-full divide-y divide-gray-200">
        {!loading && <thead>{renderHeader()}</thead>}

        {data.length === 0 && !loading ? renderEmpty() : null}

        {data.length > 0 && !loading ? <tbody>{renderData()}</tbody> : null}

        {loading ? renderLoading() : null}
      </table>
    </div>
  );
}

export default Table;
