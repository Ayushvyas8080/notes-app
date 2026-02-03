import { Link } from 'react-router';

function Navbar() {
  return (
    <nav>
      <div className='w-full h-16 bg-zinc-900 text-white font-bold'>
        <div className='flex flex-row    justify-between'>
          <h1 className='bg-zinc-700 rounded-md p-2 m-3 cursor-pointer hover:bg-zinc-800'>
            NotesBoard
          </h1>
          <div className='bg-green-500 rounded-md p-2 m-3 cursor-pointer  hover:bg-green-600'>
            <Link to={'/home/create'}>
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
