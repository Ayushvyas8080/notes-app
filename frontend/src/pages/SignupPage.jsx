import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../utils/axios';

function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return setError('All fields are required');
    }

    setError('');

    try {
      setLoading(true);
      const res = await api.post('/auth/sign-up', {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(res);
      const data = res.data;
      console.log(data);
      if (res.status === 201) {
        console.log('User created successfully');
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen w-screen flex flex-row  justify-center p-4 pt-16'>
      <form
        onSubmit={handleSubmit}
        className='h-80 w-80 sm:w-100 flex flex-col items-center   bg-stone-900 rounded-lg text-white '
      >
        <h1 className='text-2xl font-bold p-4'>Create Account</h1>
        {error && <p>{error}</p>}
        <input
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleChange}
          className='bg-stone-700 p-2 m-2 rounded-lg'
        />
        <input
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          className='bg-stone-700 p-2 m-2 rounded-lg'
        />
        <input
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          className='bg-stone-700 p-2 m-2 rounded-lg'
        />

        <button
          disabled={loading}
          className='bg-indigo-700 m-2 p-2 rounded-lg cursor-pointer hover:bg-indigo-900'
        >
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
