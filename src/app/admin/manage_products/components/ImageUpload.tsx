"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  currentImageUrl?: string | null;
  onImageChange: (imageUrl: string | null) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  currentImageUrl,
  onImageChange,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      onImageChange(result.publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return;

    try {
      // Extract filename from URL
      const fileName = currentImageUrl.split('/').pop();
      if (fileName && fileName.includes('_')) {
        // Only try to delete if it looks like our uploaded format
        await fetch(`/api/admin/upload-image?fileName=${fileName}`, {
          method: 'DELETE',
        });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      // Continue anyway - the image reference will be removed from the database
    }

    onImageChange(null);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Immagine
      </label>

      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative w-full max-w-md">
          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={currentImageUrl}
              alt="Current image"
              fill
              className="object-cover"
            />
            {!disabled && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!currentImageUrl && (
        <div
          onClick={handleClick}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            disabled
              ? 'border-gray-200 cursor-not-allowed'
              : uploading
              ? 'border-blue-300 bg-blue-50 cursor-wait'
              : 'border-gray-300 hover:border-gray-400 cursor-pointer'
          }`}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {uploading ? 'Caricamento...' : 'Clicca per caricare un\'immagine'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, WebP, GIF fino a 5MB
          </p>
        </div>
      )}

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      {/* Change Image Button */}
      {currentImageUrl && !disabled && (
        <button
          onClick={handleClick}
          disabled={uploading}
          className="w-fit px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          {uploading ? 'Caricamento...' : 'Cambia immagine'}
        </button>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}