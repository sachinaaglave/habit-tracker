import React from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="file-label">
        Choose a file
      </label>
    </div>
  );
};

export default FileUpload; 