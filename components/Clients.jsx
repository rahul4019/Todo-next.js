'use client';

import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      setUser({});
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
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
