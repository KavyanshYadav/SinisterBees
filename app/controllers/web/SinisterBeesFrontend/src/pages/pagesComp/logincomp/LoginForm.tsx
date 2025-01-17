import React, { useRef, useState } from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/button';
import { HttpHandler } from '../../../lib/HttpRequestHandler';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const inputref = useRef<HTMLInputElement | null>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputref.current?.value;
    const res = await HttpHandler.post(
      'auth/loginOptions',
      { email: email },
      { withCredentials: true },
    );
    console.log(res.data);
  };

  return (
    <div
      style={{
        width: '100%',
        marginTop: '1rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          ref={inputref}
        />
        <Button
          variant="primary"
          size="md"
          className="inline-grid items-center justify-center whitespace-nowrap h-9 rounded-md text-sm font-medium px-3 bg-blue-500 shadow-md text-white mt-1.5 mb-3 w-full hover:bg-blue-500 transition ease-in focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
