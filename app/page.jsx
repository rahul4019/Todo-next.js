import React from 'react';
import Form from './addTodoForm';
import { TodoItem } from '@/components/ServerComponents';

const page = () => {
  return (
    <div className="container">
      <Form />
      <section className="todosContainer">
        <TodoItem
          title={'Sample task'}
          description={'this is dummy description.'}
          id={'testId'}
          completed={true}
        />
      </section>
    </div>
  );
};

export default page;
