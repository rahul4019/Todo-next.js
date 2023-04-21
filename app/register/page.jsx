'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

const page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  if (user._id) return redirect('/');

  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit"> Sign Up</button>
          <p>OR</p>
          <Link href={'/login'}>Already registered?</Link>
        </form>
      </section>
    </div>
  );
};

export default page;
