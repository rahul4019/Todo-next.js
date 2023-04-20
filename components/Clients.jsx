'use client';

import Link from 'next/link';
import { createContext, useContext, useState } from 'react';

const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const LogoutBtn = () => {
  const logoutHandler = () => {
    alert('Logged out!');
  };

  const { user } = useContext(Context);

  return user ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={'/login'}>Login</Link>
  );
};

export const TodoBtn = ({ id, completed }) => {
  const deleteHandler = (id) => {
    alert(`${id} deleted`)
  }
  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={deleteHandler}>
        Delete
      </button>
    </>
  );
};
