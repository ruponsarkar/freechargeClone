import axios from 'react-native-axios';



export const getVendors=()=>{


    axios.get('https://pageuptechnologies.com/api/vendors').then((res)=>{
        console.log("res : ", res.data);
        return { data:  res.data, status: 200}
    })
    .catch((err)=>{
        console.log("error : ", err);
        return { data:  err, status: 500}
        
    })
}