import { TodoItem } from '@/components/ServerComponents';
import { cookies } from 'next/headers';
import React from 'react';

const fetchTodo = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytasks`, {
      cache: 'no-cache', // * Server side rendering (SSR)
      headers: {
        cookie: `token=${token}`,
      },
    });

    const data = await res.json();

    if (!data.success) return [];

    return data.tasks;
  } catch (error) {
    console.log('Error: ', error);
    return [];
  }
};

const todos = async () => {
  const token = cookies().get('token')?.value;
  const tasks = await fetchTodo(token);

  return (
    <section className="todosContainer">
      {tasks?.map((task) => (
        <TodoItem
          title={task.title}
          description={task.description}
          id={task._id}
          completed={task.isCompleted}
          key={task._id}
        />
      ))}
    </section>
  );
};

export default todos;
