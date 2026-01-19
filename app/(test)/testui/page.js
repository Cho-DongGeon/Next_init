'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import MultiSelectSearch from '@/components/common/MutiSelectSearch';
import ImgUpload from '@/components/common/ImgUpload';
import { DateTimePicker } from '@/components/common/datetime-picker';
import { SimpleTimePicker } from '@/components/common/simple-time-picker';
import { DateRangePicker } from '@/components/common/date-picker-range';

export default function Home() {
  const router = useRouter();
  const isReadonly = true;
  const isDisabled = true;

  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
  ];
  const toggleOption = (value) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };
  const removeOption = (value) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('09:30');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">UI 컴포넌트 테스트</h1>
          <p className="text-lg text-gray-600">shadcn/ui 컴포넌트 스타일 가이드</p>
        </div>
      </div>

      {/* Input & Textarea 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 pb-4 border-b border-gray-200">Form Components</h2>

        <section className="space-y-10">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="input" className="text-lg font-semibold text-gray-900 mb-2 block">
                Input
              </Label>
              <p className="text-base text-gray-500 mb-4">기본 입력 필드</p>
            </div>
            <Input
              type="text"
              placeholder="Input 스타일"
              className="
                  text-base h-10
                  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                  read-only:bg-blue-50 read-only:cursor-not-allowed
                "
            />
            <div className="mt-4">
              <p className="text-base text-gray-500 mb-3">읽기 전용(readonly) 상태</p>
              <Input
                type="text"
                placeholder="Input 스타일"
                readOnly={isReadonly}
                className="
                  text-base h-10
                  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                  read-only:bg-blue-50 read-only:cursor-not-allowed
                "
              />
            </div>

            <div className="mt-4">
              <p className="text-base text-gray-500 mb-3">비활성화(disabled) 상태</p>
              <Input
                type="text"
                placeholder="Input 스타일"
                disabled={isDisabled}
                className="text-base h-10 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Select */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="select" className="text-lg font-semibold text-gray-900 mb-2 block">
                Select
              </Label>
              <p className="text-base text-gray-500 mb-4">단일 선택 드롭다운</p>
            </div>
            <Select>
              <SelectTrigger className="w-full text-base h-10">
                <SelectValue placeholder="Select 스타일" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1" className="text-base">
                  옵션 1
                </SelectItem>
                <SelectItem value="option2" className="text-base">
                  옵션 2
                </SelectItem>
                <SelectItem value="option3" className="text-base">
                  옵션 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Multi Select Search */}
          <MultiSelectSearch />

          {/* Textarea */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="textarea" className="text-lg font-semibold text-gray-900 mb-2 block">
                Textarea
              </Label>
              <p className="text-base text-gray-500 mb-4">여러 줄 입력 필드</p>
            </div>
            <Textarea placeholder="Textarea 스타일" className="text-base" rows={4} />
            <div className="mt-4">
              <p className="text-base text-gray-500 mb-3">읽기 전용(readonly) 상태</p>
              <Textarea
                placeholder="Textarea 스타일"
                readOnly={isReadonly}
                className="
                  text-base
                  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                  read-only:bg-blue-50 read-only:cursor-not-allowed resize-none
                "
                rows={4}
              />
            </div>
            <div className="mt-4">
              <p className="text-base text-gray-500 mb-3">비활성화(disabled) 상태</p>
              <Textarea placeholder="Textarea 스타일" disabled={isDisabled} rows={4} className="text-base" />
            </div>
          </div>

          {/* radio 버튼 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="radio" className="text-lg font-semibold text-gray-900 mb-2 block">
                Radio Button
              </Label>
              <p className="text-base text-gray-500 mb-4">기본 라디오 버튼</p>

              <RadioGroup className="flex gap-4" defaultValue="option1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1" className="text-base text-gray-900">
                    옵션 1
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2" className="text-base text-gray-900">
                    옵션 2
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option3" id="option3" disabled />
                  <Label htmlFor="option3" className="text-base text-gray-400">
                    옵션 3 (비활성화)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* upload  */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="imgUpload" className="text-lg font-semibold text-gray-900 mb-2 block">
                Image Upload
              </Label>
              <p className="text-base text-gray-500 mb-4">이미지 업로드 컴포넌트</p>

              <ImgUpload />
            </div>
          </div>

          {/* datepicker */}
          <div>
            <div>
              <Label htmlFor="datepicker" className="text-lg font-semibold text-gray-900 mb-2 block">
                Date Picker
              </Label>
              <p className="text-base text-gray-500 mb-4">날짜 + 시간 컴포넌트</p>
            </div>

            <DateTimePicker date={date} setDate={setDate} />
          </div>

          {/* timepicker */}
          <div>
            <div>
              <Label htmlFor="timepicker" className="text-lg font-semibold text-gray-900 mb-2 block">
                Time Picker
              </Label>
              <p className="text-base text-gray-500 mb-4">시간 컴포넌트</p>
            </div>

            <SimpleTimePicker time={time} setTime={setTime} />
          </div>

          {/* datepicker range */}
          <div>
            <div>
              <Label htmlFor="datepickerRange" className="text-lg font-semibold text-gray-900 mb-2 block">
                Date Picker Range
              </Label>
              <p className="text-base text-gray-500 mb-4">날짜기간 선택 컴포넌트</p>
            </div>

            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </section>
      </div>

      {/* 네비게이션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-5">다른 테스트 페이지</h3>
        <button
          onClick={() => router.push('/tableui')}
          className="flex items-center justify-between w-full px-5 py-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
          <span className="text-lg text-blue-700 font-medium">DataTable 페이지로 이동</span>
          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
