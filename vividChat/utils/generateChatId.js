
const generateChatId = ({ userId, chatPartnerId })=>{
   return [userId, chatPartnerId].sort().join('_');
}

export default generateChatId;