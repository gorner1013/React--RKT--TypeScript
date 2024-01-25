import axios from "axios";

const API_URL = "http://localhost:8090/api/nft/";

export const add = (name: string, kind: string, price: string, user: string) => {
  const token = localStorage.getItem('auth_token');
console.log('token',token)
  return axios.post(API_URL + "add", {
    name,
    kind,
    price,
    user
  },{
    headers: {
      'x-access-token':  token
    }
  });
};

export const getMyNft = () => {
  const token = localStorage.getItem('auth_token');
  return axios.get(API_URL+"mynft",{
    headers: {
      'x-access-token':  token
    }
  });
  
};

