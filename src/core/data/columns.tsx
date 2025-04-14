import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { JSX } from "react";

type ColumnConfig<T> = {
  accessorKey?: keyof T;
  header: string;
  cell?: (props: { getValue: () => unknown; row: { original: T } }) => JSX.Element | string | unknown;
  id?: string;
};

type ActionHandlers<T> = {
  onUpdate: (item: T) => void;
  onDelete: (id: string) => void;
};

export const createColumns = <T extends { id?: string }>(
  columns: ColumnConfig<T>[],
  actions?: ActionHandlers<T>
) => {
  const baseColumns: ColumnConfig<T>[] = columns.map((col) => ({
    accessorKey: col.accessorKey,
    header: col.header,
    cell: col.cell || ((props: { getValue: () => unknown }) => props.getValue()),
  }));

  if (actions) {
    baseColumns.push({
      id: 'actions',
      header: 'Actions',
      cell: (props: { row: { original: T } }) => {
        const item = props.row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.onUpdate(item)}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.onDelete(item.id!)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    });
  }

  return baseColumns;
};
