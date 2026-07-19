"use client";

import React, { useState } from "react";
import FileUploader, { UploadedFile } from "@/components/FileUploader";

export interface FileDropzoneProps {
  label: React.ReactNode;
  subLabel?: string;
  accept?: string;
  files?: UploadedFile[];
  onFileSelect?: (file: File) => void;
  onDeleteFile?: () => void;
  isLoading?: boolean;
}

export default function FileDropzone({ 
  label, 
  subLabel, 
  accept,
  files,
  onFileSelect, 
  onDeleteFile,
  isLoading = false,
}: FileDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDelete = () => {
    setSelectedFile(null);
    onDeleteFile?.();
  };

  const resolvedFiles = files || (selectedFile 
    ? [{
        id: "temp-selected",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      }]
    : []);

  return (
    <div className="mb-6">
      <FileUploader
        id="registration-file-dropzone"
        label={label}
        subLabel={subLabel}
        accept={accept}
        files={resolvedFiles}
        onFileSelect={handleFileSelect}
        onDeleteFile={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}


