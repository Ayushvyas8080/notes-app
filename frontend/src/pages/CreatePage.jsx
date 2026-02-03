import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await api.post('/notes/note', {
        title,
        content,
      });
      navigate('/home');
    } catch (error) {
      console.error('Error creating notes', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center   justify-center bg-stone-950 text-white'>
      <div className='w-70 sm:w-100 h-min  bg-stone-800  rounded-md m-8 '>
        <div className=' flex flex-col justify-center items-center p-4 '>
          <h1 className='text-3xl font-bold text-gray-50'>Create New Note</h1>
          <form onSubmit={handleSubmit}>
            <div className='mr-14 flex flex-col'>
              <label>
                <span className='text-xl font-bold'>Title</span>
              </label>
              <input
                type='text'
                placeholder='Note Title'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className=' flex flex-col'>
              <label>
                <span className='text-xl font-bold'>Content</span>
              </label>
              <textarea
                value={content}
                placeholder='Enter Your Note'
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className='flex items-center justify-center '>
              <button
                className='cursor-pointer rounded-md p-1 font-bold bg-green-600  hover:bg-green-700'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
