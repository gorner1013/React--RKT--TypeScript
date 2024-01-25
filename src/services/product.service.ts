import axios from "axios";

const API_URL = "http://localhost:8090/api/product/";

// export const createProduct = (formData:any) => {
//   const token = localStorage.getItem('auth_token');
// console.log('token',token)
// console.log('formdata',formData.image)
//   return axios.post(API_URL + "add", {
//     formData
//   },{
//     headers: {
//       'x-access-token':  token
//     }
//   });
// };
export const createProduct = (formData: any) => {
  const token = localStorage.getItem("auth_token");
  // console.log('token',token)
  return axios({
    method: "post",
    url: API_URL + "add",
    data: formData,
    headers: { "x-access-token": token },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};
export const updateProduct = (formData: any) => {
  const token = localStorage.getItem("auth_token");
  // console.log('token',token)
  // console.log('data',formData)
  return axios({
    method: "post",
    url: API_URL + "update",
    data: formData,
    headers: { "x-access-token": token },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

export const getProduct = () => {
  const token = localStorage.getItem("auth_token");
  return axios.get(API_URL + "/", {
    headers: {
      "x-access-token": token,
    },
  });
};
export const updateProduct1 = async (
  name: string,
  description: string,
  image: string,
  price: string,
  id: string
) => {
  // console.log('delete_id',id)

  const token = localStorage.getItem("auth_token");
  return await axios.post(
    `${API_URL}/update/${id}`,
    {
      name,
      description,
      image,
      price,
    },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};
export const deleteProduct = async (id: string) => {
  // console.log('delete_id',id)

  const token = localStorage.getItem("auth_token");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

//   const token = localStorage.getItem('auth_token');
//   return await axios.delete(`/api/product/${id}`,{
//       headers: {
//         'x-access-token':  token
//       }
//   });

// };
