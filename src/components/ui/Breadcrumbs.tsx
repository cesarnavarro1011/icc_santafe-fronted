'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export default function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  const allItems = showHome 
    ? [{ label: 'Inicio', href: '/' }, ...items]
    : items;

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0 && showHome;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                
                {isLast ? (
                  <span className="text-gray-900 font-medium flex items-center">
                    {isHome && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href || '#'}
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center transition-colors duration-200"
                  >
                    {isHome && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

// Versión simplificada para páginas internas
export function SimpleBreadcrumbs({ 
  current, 
  parent 
}: { 
  current: string; 
  parent?: { label: string; href: string } 
}) {
  const items: BreadcrumbItem[] = parent 
    ? [parent, { label: current }]
    : [{ label: current }];

  return <Breadcrumbs items={items} />;
}