"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    selectedImage(selectedFile);
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // Cleanup the URL object when the component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div>
      <label>Select Image of your image</label>
      <div>
        <label htmlFor="upload-image">
          <div className={`p-28 border-dotted rounded-xl border-primary bg-slate-200 cursor-pointer hover:shadow-lg ${file ? 'p-0 bg-white' : ''}`}>
            {!file ? (
              <Image alt='Upload Image' src="/ImageUpload.svg" width={70} height={70} />
            ) : (
              fileUrl && <Image alt='Selected Image' src={fileUrl} width={300} height={300} className='w-[300px] h-[300px] object-cover' />
            )}
          </div>
        </label>
        <input type='file' accept='image/*' id="upload-image" style={{ display: 'none' }} onChange={onFileSelected} />
      </div>
    </div>
  );
}

export default ImageSelection;