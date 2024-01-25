import React, { useState, useRef } from 'react';
import logo from './logo.svg';
// import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const iconRef = useRef<HTMLInputElement>(null!);
  const [preview, setPreview] = useState('')


  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    iconRef?.current.click();
  }
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    console.log(URL.createObjectURL(file))
    setPreview(URL.createObjectURL(file))
    console.log(file);
    validateFile(file);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    validateFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      // formData.append('image', selectedFile);
      console.log(formData);
      try {
        const response = await fetch('http://localhost:8090/api/product/upload', { method: 'POST', body: formData, });
        if (response.ok) {
          console.log('Upload successful');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateFile = (file: File | null) => {
    console.log(file)
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
      } else if (file.size > 1000000) {
        setError('File size is too large');
      } else {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file))
        setError('');
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-md-4">
            <div className="upload_zone"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <header >Product Image Upload</header>
              <form onSubmit={handleSubmit}>
                <input ref={iconRef} className="file-input" type="file" onChange={handleFileInput} name="file" hidden />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16" onClick={onBtnClick}>
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg>
                <p>Click here!</p>
                <div className="mt-4">
                  <button type='submit' className="border bg-blueSecondary rounded-lg text-white p-2">Upload</button>
                </div>
              </form>
              {error}

              <section>
                <div className="col-md-4 ">
                  {preview ? <img src={preview} width={244} height={344} /> : ''}
                </div>
              </section>

            </div>


          </div>
        </div>
      </div>

    </div>
  );
}

export default App;