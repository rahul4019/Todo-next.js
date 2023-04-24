'use client';

import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

const page = () => {
  const { user } = useContext(Context);
  if (!user._id) redirect('/login');
  return (
    <div>
      <h1>
        {user.name} <p>{user.email}</p>
      </h1>
    </div>
  );
};

export default page;
