import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  maxRows?: number;
  emptyMessage?: string;
}

type SortDirection = 'asc' | 'desc' | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T extends Record<string, any>>({ columns, data, onRowClick, maxRows, emptyMessage = 'Nenhum dado encontrado.' }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') { setSortKey(null); setSortDir(null); }
      else setSortDir('asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    let result = [...data];
    if (sortKey && sortDir) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal ?? '');
        const bStr = String(bVal ?? '');
        return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }
    if (maxRows) result = result.slice(0, maxRows);
    return result;
  }, [data, sortKey, sortDir, maxRows]);

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-900/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-700/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-surface-500 ${col.sortable ? 'cursor-pointer hover:text-surface-300 select-none' : ''} ${col.className ?? ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <span className="text-surface-600">
                        {sortKey === col.key ? (
                          sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        ) : (
                          <ChevronsUpDown size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-surface-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((item, i) => (
                <tr
                  key={i}
                  className={`border-b border-surface-800/50 last:border-0 transition-colors duration-150 ${onRowClick ? 'cursor-pointer hover:bg-surface-800/50' : 'hover:bg-surface-800/30'}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`px-4 py-3 text-sm text-surface-300 ${col.className ?? ''}`}>
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {maxRows && data.length > maxRows && (
        <div className="border-t border-surface-800/50 px-4 py-2.5 text-center">
          <span className="text-xs text-surface-500">
            Mostrando {maxRows} de {data.length} registros
          </span>
        </div>
      )}
    </div>
  );
}
