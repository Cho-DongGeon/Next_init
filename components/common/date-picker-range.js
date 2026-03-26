'use client';

import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // 디자인 일관성을 위해 Button 권장
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function RangePicker({ value, onChange, placeholder = '날짜 범위 선택', className }) {
  const [isMobile, setIsMobile] = useState(false);

  // 1. 화면 크기 감지 (768px 기준)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. 에러 방지를 위한 포맷 함수 (value가 undefined여도 안전)
  const formatDateRange = () => {
    if (!value?.from || !isValid(new Date(value.from))) {
      return placeholder;
    }

    const fromStr = format(new Date(value.from), 'yyyy.MM.dd');

    if (!value.to || !isValid(new Date(value.to))) {
      return fromStr;
    }

    const toStr = format(new Date(value.to), 'yyyy.MM.dd');
    return `${fromStr} ~ ${toStr}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal h-10 px-3 relative gap-2',
            !value?.from && 'text-muted-foreground',
            className,
          )}>
          <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="flex-1 truncate">{formatDateRange()}</span>
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        </Button>
      </PopoverTrigger>

      {/* 3. 모바일 환경 최적화 (중앙 정렬 및 개수 조정) */}
      <PopoverContent className="w-auto p-0" align={isMobile ? 'center' : 'start'}>
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={isMobile ? 1 : 2} // 반응형 핵심
          initialFocus
          locale={ko}
          // 값이 없을 때 보여줄 기본 월 설정 (에러 방지)
          defaultMonth={value?.from && isValid(new Date(value.from)) ? new Date(value.from) : new Date()}
          modifiersClassNames={{
            today: 'bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
