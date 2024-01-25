import React, { useEffect, Fragment, useRef, useState } from 'react'
import { getProduct } from "services/product.service";
import Card from "components/card";
import Dropdown from "components/dropdown";
import InputField from "components/fields/InputField";
import { ProductType } from "types/user";
import { createProduct, deleteProduct, updateProduct } from "services/product.service";
import "react-responsive-modal/styles.css";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import Up from "./components/Imgupload";
import { } from "services/product.service";
import speaker from "assets/img/products/speaker.jpg";
import NewModal from './components/NewModal';
import EditModal from './components/EditModal';
// import ImageUpload from "components/ImageUpload";

// import Checkbox from "components/checkbox";


const Product = () => {

    const initalState: ProductObj = {
        name: "",
        description: "",
        image: "",
        price: "",
        owner: "",
        _id: ""
    }
    const [modal, setModal] = useState(false);
    const [newmodal, setNewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductObj>(initalState);

    const [products, setProduct] = useState<ProductObj[]>([]);
    const [reload, setReload] = useState(true);
    const [inputs, setInputs] = useState<ProductObj>(initalState);

    useEffect(() => {
        if (reload) {
            getProduct().then(
                (res: any) => {
                    setProduct(res.data);
                    setReload(false);
                });
        }

    }, [reload]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        // console.log(name);
        setInputs(values => ({ ...values, [name]: value }));
        setSelectedProduct(values => ({ ...values, [name]: value }))
    }
    // const handleSubmit = (event: any) => {
    //     event.preventDefault();
    //     setReload(true);
    //     const { name, description, image, price } = inputs;
    //     const user = localStorage.getItem('userName');
    //     createProduct(name, description, image, price).then(
    //         (response) => {
    //         },
    //         (error) => {
    //             console.log('error')
    //         }
    //     )
    // }
    const handleUpdate = (product: ProductObj) => {
        // const { name, description, image, price } = inputs;
        // await updateProduct(name, description, image, price, id).then(
        //     (response) => {
        //         console.log('success')
        //     },
        //     (error) => {
        //         console.log('error')
        //     }
        // );
        setSelectedProduct(product);
        setModal(true);
        setReload(true);

    }
    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        setReload(true);

    }
    const productAdd = () => {
        setReload(true);
        setNewModal(true);
        // setSelectedProduct(null);
    }

    return (
        <div>

            <button className="linear my-4 flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={productAdd}>
                New Product
            </button>
            {/* <Dropdown
                button={
                    <p className="cursor-pointer">
                        <button className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                            New Product
                        </button>
                    </p>
                }
                animation="origin-[85%_80%] md:origin-top-left transition-all duration-300 ease-in-out"
                children={
                    <div className="flex w-full flex-col gap-3 rounded-[20px] bg-gray-600 p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[350px]">
                        <div className="flex items-center justify-between">
                            <p className="text-base font-bold text-navy-700 dark:text-white">
                                New Product
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-row'>
                                <Up />
                                <div>
                                    <InputField
                                        name="name"
                                        variant="product"
                                        extra="mb-0"
                                        label="Name*"
                                        placeholder="Input Product Name,Please!"
                                        id="name"
                                        type="text"
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        name="description"
                                        variant="product"
                                        extra="mb-0"
                                        label="Description*"
                                        placeholder="Input Description,Please!"
                                        id="description"
                                        type="text"
                                        value={inputs.description || ""}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        name="image"
                                        variant="product"
                                        extra="mb-0"
                                        label="Image*"
                                        placeholder="Input Nft Image,Please!"
                                        id="image"
                                        type="text"
                                        value={inputs.image || ""}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        name="price"
                                        variant="product"
                                        extra="mb-0"
                                        label="Price*"
                                        placeholder="Input Nft Price,Please!"
                                        id="price"
                                        type="text"
                                        value={inputs.price || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                ADD
                            </button>
                        </form>
                    </div>
                }
                classNames={"py-2 top-[20px] left-[30px] md:left-[170px] w-max "}
            /> */}
            <Card extra={"w-full sm:overflow-auto px-6"}>
                <header className="relative flex items-center justify-between pt-4">
                    <div className="my-5 text-xl font-bold text-navy-700 dark:text-white">
                        Product Introduct
                    </div>
                </header>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <span>Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Update
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, key) => (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900" key={key}>
                                    <td className="w-10 p-2">
                                        <img src={`http://localhost:8090/images/users/${product.image}`} alt="noImg" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.description}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* if({product.owner}!=localStorage.getItem(userId)){
                                            <button onClick={() => product._id && handleUpdate(product)} type="button" data-modal-show="editUserModal" disabled className="disabled:opacity-50 font-bold text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        } else { */}
                                            <button onClick={() => product._id && handleUpdate(product)} type="button" data-modal-show="editUserModal" className="text-md font-bold text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        {/* } */}

                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={() => product._id && handleDelete(product._id)} className="font-bold text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <NewModal setReload={setReload} newmodal={newmodal} setNewModal={setNewModal} inputs={inputs} selectedProduct={selectedProduct} handleChange={handleChange} />
                    {selectedProduct && (
                        <EditModal setReload={setReload} modal={modal} setModal={setModal} selectedProduct={selectedProduct} handleChange={handleChange} />

                    )}

                </div>
            </Card>
            {/* <ImageUpload /> */}
            {/* <Up /> */}
        </div>

    );
};

export default Product;