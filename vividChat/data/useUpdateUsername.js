import { useEffect, useContext } from 'react';

import { SocketContext } from '../../contexts/socketContext.js';

const useUpdateUsername = ({ userId, newName, newAbout, conformUpdateUsername })=>{
   const socket = useContext(SocketContext);
   
   useEffect(()=>{
      if(!socket || !userId || !conformUpdateUsername || !newName) return;
      
      console.log('first')
      
   }, [conformUpdateUsername])
   
}

export default useUpdateUsername;