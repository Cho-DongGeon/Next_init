//https://github.com/huybuidac/shadcn-datetime-picker
'use client';

import * as React from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SimpleTimePicker({ time, setTime, className, use24Hour = false }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
  const hours24 = Array.from({ length: 24 }, (_, i) => i); // 0-23
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Get current hour in 12-hour format and period
  const get12HourFormat = () => {
    if (!time) return { hour: 12, period: 'AM' };
    const hours = parseInt(time.split(':')[0]);
    return {
      hour: hours === 0 ? 12 : hours > 12 ? hours - 12 : hours,
      period: hours >= 12 ? 'PM' : 'AM',
    };
  };

  const { hour: currentHour, period: currentPeriod } = get12HourFormat();

  const getCurrentMinutes = () => {
    if (!time) return '00';
    return time.split(':')[1] || '00';
  };

  const getCurrentHours24 = () => {
    if (!time) return '00';
    return time.split(':')[0] || '00';
  };

  const handleTimeChange = (type, value) => {
    if (use24Hour) {
      if (type === 'hours') {
        const newHours = value.toString().padStart(2, '0');
        const minutes = getCurrentMinutes();
        setTime(`${newHours}:${minutes}`);
      } else if (type === 'minutes') {
        const hours = getCurrentHours24();
        const newMinutes = value.toString().padStart(2, '0');
        setTime(`${hours}:${newMinutes}`);
      }
    } else {
      const minutes = getCurrentMinutes();
      if (type === 'hours') {
        const hour12 = parseInt(value);
        const currentPeriod = parseInt(getCurrentHours24()) >= 12 ? 'PM' : 'AM';

        // Convert 12-hour to 24-hour
        let hour24;
        if (currentPeriod === 'AM') {
          hour24 = hour12 === 12 ? 0 : hour12;
        } else {
          hour24 = hour12 === 12 ? 12 : hour12 + 12;
        }
        setTime(`${hour24.toString().padStart(2, '0')}:${minutes}`);
      } else if (type === 'minutes') {
        const hours = getCurrentHours24();
        const newMinutes = value.toString().padStart(2, '0');
        setTime(`${hours}:${newMinutes}`);
      } else if (type === 'period') {
        const currentHour = parseInt(getCurrentHours24());
        let newHour24;
        if (value === 'AM' && currentHour >= 12) {
          newHour24 = currentHour - 12;
        } else if (value === 'PM' && currentHour < 12) {
          newHour24 = currentHour + 12;
        } else {
          newHour24 = currentHour;
        }
        setTime(`${newHour24.toString().padStart(2, '0')}:${minutes}`);
      }
    }
  };

  const formatDisplayTime = () => {
    if (!time) return '시간 선택';
    if (use24Hour) {
      return time;
    } else {
      const [hours, minutes] = time.split(':');
      const { hour: hour12, period } = get12HourFormat();
      const periodKo = period === 'AM' ? '오전' : '오후';
      return `${hour12.toString().padStart(2, '0')}:${minutes} ${periodKo}`;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('justify-start text-left font-normal text-base', !time && 'text-muted-foreground', className)}>
          <Clock className="h-4 w-4" />
          <span>{formatDisplayTime()}</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-2">
          <Select
            value={use24Hour ? getCurrentHours24() : currentHour.toString()}
            onValueChange={(value) => handleTimeChange('hours', value)}>
            <SelectTrigger className="w-[60px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {(use24Hour ? hours24 : hours12).map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm font-semibold">:</span>
          <Select value={getCurrentMinutes()} onValueChange={(value) => handleTimeChange('minutes', value)}>
            <SelectTrigger className="w-[60px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  {minute.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!use24Hour && (
            <Select value={currentPeriod} onValueChange={(value) => handleTimeChange('period', value)}>
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">오전</SelectItem>
                <SelectItem value="PM">오후</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
