import axios from 'axios'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { BsNutFill } from 'react-icons/bs';

export const UserContext = createContext({})

type userContextProviderProps = {
    children: ReactNode;
}

export function UserContextProvider({children}: userContextProviderProps) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get('/auth/profile');
            setUser(response.data);
          } catch (error) {
            console.error('Failed to fetch user', error);
          }
        };
    
        fetchUser();
      }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}