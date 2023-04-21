'use client';

import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = () => {
    alert('Logged out!');
  };

  return user._id ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={'/login'}>Login</Link>
  );
};

export const TodoBtn = ({ id, completed }) => {
  const deleteHandler = (id) => {
    alert(`${id} deleted`);
  };
  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={deleteHandler}>
        Delete
      </button>
    </>
  );
};
