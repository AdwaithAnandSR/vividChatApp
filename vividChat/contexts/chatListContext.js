import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);

  return (
    <ChatContext.Provider value={{ chatList, setChatList }}>
      {children}
    </ChatContext.Provider>
  );
};
