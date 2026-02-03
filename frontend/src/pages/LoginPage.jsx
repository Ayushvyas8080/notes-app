import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function LoginPage() {
  const [form, setForm] = useState({
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
    if (!form.email || !form.password) {
      return setError('All fields are required');
    }
    setError('');

    try {
      setLoading(true);
      const res = await api.post('/auth/sign-in', {
        email: form.email,
        password: form.password,
      });

      console.log(res);

      if (res.status === 200) {
        console.log('User logged successfully');
        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
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
        <h1 className='text-2xl font-bold p-4'>Login to Account</h1>
        {error && <p>{error}</p>}

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
          {loading ? 'Logging...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
