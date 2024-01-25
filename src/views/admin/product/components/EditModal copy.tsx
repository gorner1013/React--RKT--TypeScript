import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import PureModal from 'react-pure-modal';
import InputField from "components/fields/InputField";
import Up from "./Imgupload";

function EditModal(props: {
    modal: boolean;
    setModal: (value: boolean) => void;
    setReload: (value: boolean) => void;
    // inputs: any;
    selectedProduct: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [x: string]: any;
}) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const iconRef = useRef<HTMLInputElement>(null!);
    const [preview, setPreview] = useState('')
    const { modal, setReload, setModal, selectedProduct, handleChange, ...rest } = props;

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
        setReload(true);
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
            <PureModal
                className='!w-[500px]'
                isOpen={modal}
                closeButton="close"
                closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }}
            >
                <div className="relative w-full max-w-4xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <form onSubmit={handleSubmit} action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Product
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-x-16 flex flex-col grid-cols-12 sm:flex-row items-center justify-center">
                            <div className='grid-cols-6'>
                                {/* <Up /> */}
                                <div className="col-md-4">
                                    <div className="flex flex-col items-center"
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <header >Product Image Upload</header>
                                        <div className="flex flex-col items-center">
                                            <input ref={iconRef} className="file-input" type="file" onChange={handleFileInput} name="file" hidden />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16" onClick={onBtnClick}>
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                            {/* <p>Click here!</p> */}
                                            {/* <div className="mt-4">
                                                <button type='submit' className="border bg-blueSecondary rounded-lg text-white p-2">Upload</button>
                                            </div> */}
                                        </div>
                                        {error}

                                        <section>
                                            <div className="col-md-4 ">
                                                {preview ? <img src={preview} width={244} height={344} /> : <img src={`http://localhost:8090/images/users/${selectedProduct.image}`} width={244} height={344} />}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid-cols-6 gap-6  flex-col">
                                <InputField
                                    name="name"
                                    variant="product"
                                    extra=""
                                    label="Name*"
                                    placeholder="Input Product Name,Please!"
                                    id="name"
                                    type="text"
                                    value={selectedProduct.name || ""}
                                    onChange={handleChange}
                                />
                                <InputField
                                    name="description"
                                    variant="product"
                                    extra=""
                                    label="Description*"
                                    placeholder="Input Description Name,Please!"
                                    id="description"
                                    type="text"
                                    value={selectedProduct.description || ""}
                                    onChange={handleChange}
                                />
                                <InputField
                                    name="price"
                                    variant="price"
                                    extra=""
                                    label="Price*"
                                    placeholder="Input Price Name,Please!"
                                    id="price"
                                    type="text"
                                    value={selectedProduct.price || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </div>
                    </form>
                </div>
            </PureModal>
        </div>
    );
}

export default EditModal;