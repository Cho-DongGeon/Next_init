'use client';

import { ImageIcon, Upload, X } from 'lucide-react';
import { useState } from 'react';

export default function ImgUpload() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('업로드 성공:', data);
      alert('업로드 완료!');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드 실패');
    }
  };

  return (
    <div>
      {/* 파일 업로드 영역 */}
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
              relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
              transition-all duration-200
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}
            `}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`
                p-4 rounded-full transition-colors
                ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
              <Upload className={`w-10 h-10 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {isDragging ? '파일을 여기에 놓으세요' : '이미지를 업로드하세요'}
              </p>
              <p className="text-sm text-gray-500">클릭하거나 드래그 앤 드롭으로 이미지 추가</p>
            </div>

            <div className="mt-2">
              <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" />
                파일 선택
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* 미리보기 영역 */
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center min-h-[200px]">
            <img src={preview} alt="preview" className="max-w-full max-h-96 w-auto h-auto object-contain" />

            <button
              onClick={handleRemove}
              className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
