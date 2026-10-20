'use client';

import * as React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  Link2,
  RefreshCw,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface UploadedImageMeta {
  url: string;
  filename: string;
  byteSize?: number;
  width?: number;
  height?: number;
}

export interface ImageUploaderProps {
  value: string;
  onChange: (url: string, meta?: UploadedImageMeta) => void;
  id?: string;
  className?: string;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function optimizeImageFile(file: File): Promise<{
  blob: Blob;
  filename: string;
  mimeType: string;
  width?: number;
  height?: number;
}> {
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return {
      blob: file,
      filename: file.name,
      mimeType: file.type,
    };
  }

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDim = 1600;
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      const needsResize = width > maxDim || height > maxDim;
      const needsCompress = file.size > 350 * 1024;

      if (!needsResize && !needsCompress) {
        resolve({
          blob: file,
          filename: file.name,
          mimeType: file.type || 'image/jpeg',
          width,
          height,
        });
        return;
      }

      if (width > maxDim || height > maxDim) {
        if (width >= height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({
          blob: file,
          filename: file.name,
          mimeType: file.type || 'image/jpeg',
          width,
          height,
        });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const outputType =
        file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = outputType === 'image/jpeg' ? 0.86 : undefined;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              blob: file,
              filename: file.name,
              mimeType: file.type || 'image/jpeg',
              width,
              height,
            });
            return;
          }
          const ext = outputType === 'image/png' ? '.png' : '.jpg';
          const baseName = file.name.replace(/\.[^.]+$/, '');
          resolve({
            blob,
            filename: `${baseName}${ext}`,
            mimeType: outputType,
            width,
            height,
          });
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        blob: file,
        filename: file.name,
        mimeType: file.type || 'image/jpeg',
      });
    };

    img.src = objectUrl;
  });
}

export function ImageUploader({
  value,
  onChange,
  id = 'portfolio-image-upload',
  className,
}: ImageUploaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [mode, setMode] = React.useState<'upload' | 'url'>('upload');
  const [dragging, setDragging] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [meta, setMeta] = React.useState<UploadedImageMeta | null>(null);

  async function processAndUploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP, GIF, AVIF).');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const optimized = await optimizeImageFile(file);
      const formData = new FormData();
      const uploadFile = new File([optimized.blob], optimized.filename, {
        type: optimized.mimeType,
      });
      formData.append('file', uploadFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Upload failed. Please try again.');
        setUploading(false);
        return;
      }

      const uploadedMeta: UploadedImageMeta = {
        url: data.url,
        filename: optimized.filename,
        byteSize: Number(data.byteSize || uploadFile.size),
        width: optimized.width,
        height: optimized.height,
      };

      setMeta(uploadedMeta);
      onChange(data.url, uploadedMeta);
    } catch {
      setError('Network error while uploading image.');
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      void processAndUploadFile(file);
    }
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void processAndUploadFile(file);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          void processAndUploadFile(file);
          break;
        }
      }
    }
  }

  return (
    <div
      onPaste={handlePaste}
      className={cn('space-y-3', className)}
    >
      {/* Mode Switcher Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#a1a1aa]">
          Project Artwork
        </span>
        <div className="inline-flex items-center gap-1 rounded-full border border-[#26272b] bg-[#0d0e11] p-0.5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={cn(
              'action-button inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-colors',
              mode === 'upload'
                ? 'bg-[#ffd400] text-[#09090b]'
                : 'text-[#a1a1aa] hover:text-[#fafafa]'
            )}
          >
            <UploadCloud size={12} /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={cn(
              'action-button inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-colors',
              mode === 'url'
                ? 'bg-[#ffd400] text-[#09090b]'
                : 'text-[#a1a1aa] hover:text-[#fafafa]'
            )}
          >
            <Link2 size={12} /> Image Path / URL
          </button>
        </div>
      </div>

      {/* Hidden Accessible File Input (using clip-path visually-hidden recipe) */}
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
        onChange={handleFileChange}
        disabled={uploading}
        className="peer visually-hidden"
      />

      {mode === 'url' ? (
        <div className="space-y-2">
          <Input
            id={`${id}-url`}
            name="image_url"
            required
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="none"
            placeholder="/portfolio/branding/801.jpg or https://..."
            value={value}
            onChange={(e) => {
              setMeta(null);
              onChange(e.target.value);
            }}
          />
        </div>
      ) : !value ? (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!dragging) setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
          }}
          onDrop={handleDrop}
          className={cn(
            'group relative flex min-h-[148px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border border-dashed p-5 text-center transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffd400]',
            dragging
              ? 'scale-[1.01] border-[#ffd400] bg-[#ffd400]/10'
              : 'border-[#32343a] bg-[#0d0e11]/90 hover:border-[#ffd400]/60 hover:bg-[#121318]',
            uploading && 'pointer-events-none opacity-75'
          )}
        >
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2e3036] bg-[#16171c] text-[#ffd400] shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105',
              uploading && 'animate-pulse'
            )}
          >
            {uploading ? (
              <RefreshCw size={19} className="animate-spin" />
            ) : (
              <ImagePlus size={19} />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-[#fafafa]">
              {uploading ? (
                'Optimizing & uploading to Neon...'
              ) : (
                <>
                  Drop an image here, or{' '}
                  <span className="text-[#ffd400] underline underline-offset-4">
                    browse files
                  </span>
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-[#a1a1aa]">
              JPG, PNG, WebP, AVIF or GIF • Auto-optimized up to 1600px • Paste supported
            </p>
          </div>
        </label>
      ) : null}

      {/* Uploaded / Selected Preview Card */}
      {value && (
        <div className="sonner-toast flex flex-col gap-3 rounded-2xl border border-[#2e3036] bg-[#0d0e11] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#16171c]">
              <img
                src={value}
                alt="Uploaded artwork preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" className="px-2 py-0.5 text-[10px]">
                  <CheckCircle2 size={11} /> Ready
                </Badge>
                {meta?.byteSize && (
                  <span className="tabular-nums text-xs font-bold text-[#a1a1aa]">
                    {formatBytes(meta.byteSize)}
                  </span>
                )}
                {meta?.width && meta?.height && (
                  <span className="tabular-nums text-xs text-[#71717a]">
                    {meta.width} × {meta.height}
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-xs font-medium text-[#d4d4d8]">
                {meta?.filename || value}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud size={13} />{' '}
              {uploading ? 'Uploading...' : 'Replace'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setMeta(null);
                onChange('');
              }}
              aria-label="Remove selected image"
              className="h-8 w-8 hover:text-[#ed168c]"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-xs font-bold text-[#ff7ec4]"
        >
          <AlertCircle size={13} className="shrink-0 text-[#ed168c]" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
