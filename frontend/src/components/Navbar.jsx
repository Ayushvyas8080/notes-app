import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import api from '../utils/axios';

function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await api.post('/auth/sign-out');
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <nav>
      <div className='w-full h-16 bg-zinc-900 text-white font-bold'>
        <div className='flex flex-row    justify-between'>
          <h1 className='bg-zinc-700 rounded-md p-2 m-3 cursor-pointer hover:bg-zinc-800'>
            NotesBoard
          </h1>
          <div className='flex'>
            <div className='bg-green-500 rounded-md p-2 m-3 cursor-pointer  hover:bg-green-600'>
              <Link to={'/home/create'}>
                <span>New Note</span>
              </Link>
            </div>
            <div className='bg-red-500 rounded-md p-2 m-3 cursor-pointer  hover:bg-red-600'>
              <button className='cursor-pointer' onClick={handleSignOut}>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
