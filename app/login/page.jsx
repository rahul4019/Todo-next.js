import React from 'react';

const page = () => {
  return (
    <div className="login">
      <section>
        <form>
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <button type="submit"> Login</button>
        </form>
      </section>
    </div>
  );
};

export default page;
