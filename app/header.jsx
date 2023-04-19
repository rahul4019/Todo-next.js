import Link from 'next/link';
import React from 'react';

const header = () => {
  return (
    <div className="header">
      <div>
        <h2>Todo</h2>
      </div>
      <article>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/'}>Login</Link>
      </article>
    </div>
  );
};

export default header;
