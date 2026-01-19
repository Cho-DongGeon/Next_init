//https://github.com/huybuidac/shadcn-datetime-picker
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DateTimePicker({ date, setDate, className }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Get current hour in 12-hour format and period
  const get12HourFormat = () => {
    if (!date) return { hour: 12, period: 'AM' };
    const hours = date.getHours();
    return {
      hour: hours === 0 ? 12 : hours > 12 ? hours - 12 : hours,
      period: hours >= 12 ? 'PM' : 'AM',
    };
  };

  const { hour: currentHour, period: currentPeriod } = get12HourFormat();

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (date) {
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
      }
      setDate(newDate);
    }
  };

  const handleTimeChange = (type, value) => {
    if (!date) {
      setDate(new Date());
      return;
    }

    const newDate = new Date(date);

    if (type === 'hours') {
      const hour12 = parseInt(value);
      const currentPeriod = newDate.getHours() >= 12 ? 'PM' : 'AM';

      // Convert 12-hour to 24-hour
      let hour24;
      if (currentPeriod === 'AM') {
        hour24 = hour12 === 12 ? 0 : hour12;
      } else {
        hour24 = hour12 === 12 ? 12 : hour12 + 12;
      }
      newDate.setHours(hour24);
    } else if (type === 'minutes') {
      newDate.setMinutes(parseInt(value));
    } else if (type === 'period') {
      const currentHour = newDate.getHours();
      if (value === 'AM' && currentHour >= 12) {
        newDate.setHours(currentHour - 12);
      } else if (value === 'PM' && currentHour < 12) {
        newDate.setHours(currentHour + 12);
      }
    }

    setDate(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('justify-start text-left font-normal text-base', !date && 'text-muted-foreground', className)}>
          <CalendarIcon className=" h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd hh:mm a', { locale: ko }) : <span>Pick a date</span>}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          locale={ko}
          modifiersClassNames={{
            today: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
          }}
        />
        <div className="flex items-center gap-2 border-t p-3">
          <Select value={currentHour.toString()} onValueChange={(value) => handleTimeChange('hours', value)}>
            <SelectTrigger className="w-[60px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hours12.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>:</span>
          <Select value={date ? date.getMinutes().toString() : '0'} onValueChange={(value) => handleTimeChange('minutes', value)}>
            <SelectTrigger className="w-[60px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  {minute.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={currentPeriod} onValueChange={(value) => handleTimeChange('period', value)}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">오전</SelectItem>
              <SelectItem value="PM">오후</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
