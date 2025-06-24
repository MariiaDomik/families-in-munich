import React from 'react';

interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyText?: string;
}

export default function ListView<T>({ items, renderItem, emptyText }: ListViewProps<T>) {
  if (!items.length) {
    return <div className="text-gray-400 text-center py-8">{emptyText || 'No items found.'}</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {items.map(renderItem)}
    </div>
  );
} 