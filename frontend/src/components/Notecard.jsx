import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

function Notecard({ note }) {
  return (
    <Link
      to={`/note/${note.id}`}
      className='bg-stone-800  w-min h-min text-white rounded-lg p-4'
    >
      <div className='flex flex-col '>
        <h1 className='text-2xl font-bold mb-2'>{note.title}</h1>
        <p className='text-stone-400 mb-2'>{note.content}</p>
        <div className='flex gap-4'>
          <span>{formatDate(note.createdAt)}</span>
          <div className=' flex gap-2 '>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Notecard;
