'use client';
import getUndreadMessageCount from '@/app/actions/getUndreadMessageCount';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedFeaturesWithPriority, setSelectedFeaturesWithPriority] = useState({});

  const { data: session } = useSession();

  // NOTE: since our GlobalContext is responsible for unreadCount state then it
  // makes sense to also fetch the unreadCount here too and remove that from the
  // UnreadMessageCount component.
  // Additionally here we are using a server action to get the unreadCount
  useEffect(() => {
    if (session && session.user) {
      getUndreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        selectedFeaturesWithPriority,
        setSelectedFeaturesWithPriority
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}