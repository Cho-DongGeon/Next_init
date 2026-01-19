'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DateRangePicker({ dateRange, setDateRange, className }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoverDate, setHoverDate] = React.useState(null);

  const formatDateRange = () => {
    if (!dateRange.from) {
      return '날짜 범위 선택';
    }
    if (!dateRange.to) {
      return format(dateRange.from, 'yyyy-MM-dd', { locale: ko });
    }
    return `${format(dateRange.from, 'yyyy-MM-dd', { locale: ko })} ~ ${format(dateRange.to, 'yyyy-MM-dd', { locale: ko })}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('justify-start text-left font-normal', !dateRange.from && 'text-muted-foreground', className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <Calendar
            mode="range"
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
            initialFocus
            locale={ko}
            modifiersClassNames={{
              today: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
