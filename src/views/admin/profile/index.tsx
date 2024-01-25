import React, { useState, useRef, useEffect, SetStateAction } from 'react'
import { updateUser, getCurrentUser } from "services/profile.service";
import navbarimage from "assets/img/layout/Navbar.png";

// import Test from "./components/test_reduxtoolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { addTodo, removeTodo, setTodoStatus } from "redux/todoSlice";
import { setUser } from "redux/userSlice";

const Profile = () => {
    //React Hooks
    const [todoDescription, setTodoDescription] = useState("");

    //React Redux Hooks
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    //avatar upload
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const iconRef = useRef<HTMLInputElement>(null!);
    const [preview, setPreview] = useState('')

    const initalState: ProfileObj | null = {
        username: "",
        location: ``,
        // website: " ",
        company: "",
        phone: "",
        birthday: "",
        avatar: "",
    }

    const [profiles, setProfile] = useState<ProfileObj>(initalState);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            getCurrentUser().then(

                (res: any) => {
                    setProfile(res.data);
                    setReload(false);
                });
        }

    }, [reload]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        // console.log(name);
        setProfile(values => ({ ...values, [name]: value }));
        // setSelectedProduct(values => ({ ...values, [name]: value }))
    }

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { username, location, website, company, phone, birthday } = profiles;
        if (profiles.username == "") { }
        const formData = new FormData();
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        if (profiles.location) {
            formData.append('location', profiles.location);
        }if (profiles.website) {
            formData.append('website', profiles.website);
        }if (profiles.company) {
            formData.append('company', profiles.company);
        }if (profiles.phone) {
            formData.append('phone', profiles.phone);
        }if (profiles.birthday) {
            formData.append('birthday', profiles.birthday);
        }
        formData.append('username', profiles.username);
        updateUser(formData).then(
            (res) => {
                alert("Success!")
                dispatch(setUser(res.data));//redux toolkit
            },
            (error) => {
                console.log('error')
            }
        )
    };

    const validateFile = (file: File | null) => {
        console.log(file)
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
            } else if (file.size > 10000000) {
                setError('File size is too large');
            } else {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file))
                setError('');
            }
        }
    };


    return (
        <div className="flex flex-col gap-5 md:flex-row items-center justify-evenly mt-20">
            <div className="col-span-3">
                <div className="col-md-4">
                    <div className='flex flex-col items-center'
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <header className='text-green-600 font-bold'>User Avatar Upload</header>
                        <div className='flex flex-col items-center'>
                            <input ref={iconRef} className="file-input" type="file" onChange={handleFileInput} name="file" hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16" onClick={onBtnClick}>
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg>
                            {/* <p>Click here!</p> */}
                            {/* <div className="mt-4">
                                                        <button type='submit' className="border bg-green-500 rounded-lg text-white p-2">Upload</button>
                                                    </div> */}
                        </div>
                        {error}

                        <section>
                            <div className="col-md-4 ">
                                {preview ? <img src={preview} width={244} height={344} /> : profiles.avatar ? <img src={`http://localhost:8090/images/users/${profiles.avatar}`} width={244} height={344} /> : <img src={navbarimage} width={244} height={344} />}
                            </div>
                        </section>

                    </div>


                </div>
            </div>
            <div className="relative w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <form onSubmit={handleSubmit} action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit user
                        </h3>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                                <input type="text" value={profiles.username} name="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder="User Name" disabled />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                <input type="text" value={profiles.company} name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder="" />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input name="phone" value={profiles.phone} onChange={handleChange} id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BirthDay</label>
                                <input type="text" value={profiles.birthday} name="birthday" onChange={handleChange} id="birthday" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1970-11-11" />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" value={profiles.location} name="location" onChange={handleChange} id="location" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                <input type="text" value={profiles.website} name="website" onChange={handleChange} id="website" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                    </div>
                </form>
            </div>

            {/* <Test /> */}
        </div>
    );
};

export default Profile;