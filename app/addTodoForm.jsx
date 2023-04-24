'use client';

import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import { Context } from '@/components/Clients';

const addTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(Context);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/newtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);

      router.refresh(); // * refreshes the current page
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error(data.message);
    }
  };

  if (!user._id) return redirect('/login');

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit"> Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default addTodoForm;
