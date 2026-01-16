'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';

export default function MultiSelect() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(false);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
  ];

  const toggleOption = (value) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="multi-select" className="block font-medium">
          멀티 셀렉
        </Label>
        {selectedValues.length > 0 && (
          <button onClick={() => setSelectedValues([])} className="text-base text-gray-500 hover:text-gray-700 underline">
            전체 해제
          </button>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between min-h-[35px] h-auto ${selectedValues.length > 0 ? 'py-2' : ''}`}>
            <div className="flex gap-1.5 flex-wrap items-center flex-1">
              {selectedValues.length > 0 ? (
                <>
                  {selectedValues.slice(0, 3).map((val) => {
                    const option = options.find((o) => o.value === val);
                    return (
                      <Badge
                        key={val}
                        variant="secondary"
                        className="pl-2.5 pr-1.5 py-1 gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(val);
                        }}>
                        <span className="text-xs font-medium">{option?.label}</span>
                        <X className="h-3 w-3 hover:bg-blue-200 rounded-full transition-colors cursor-pointer" />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      +{selectedValues.length - 3}
                    </Badge>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-400 font-normal">옵션을 선택해주세요</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="옵션 검색..." className="h-10 text-sm" />
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">검색 결과가 없습니다</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto p-1">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-md">
                    <div
                      className={`flex items-center justify-center w-4 h-4 border-2 rounded ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                      <Check className={`h-3 w-3 text-white ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className={`text-sm flex-1 ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* 선택된 항목 요약 */}
      {selectedValues.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm text-blue-700 font-medium">{selectedValues.length}개 항목 선택됨</span>
        </div>
      )}
    </div>
  );
}
