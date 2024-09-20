import axios from 'axios';

const checkHealth = async ( serverURL ) =>{
   const res = await axios.get(`${serverURL}/health`);
   return res.status;
}

export default checkHealth;