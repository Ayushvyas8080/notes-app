import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import api from '../utils/axios';

function Notecard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log('Error in handleDelete', error);
    }
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className='bg-stone-800  w-min h-min text-white rounded-lg p-4'
    >
      <div className='flex flex-col '>
        <h1 className='text-2xl font-bold mb-2'>{note.title}</h1>
        <p className='text-stone-400 mb-2'>{note.content}</p>
        <div className='flex gap-4'>
          <span className='text-zinc-200'>{formatDate(note.createdAt)}</span>
          <div>
            <button
              className='cursor-pointer  bg-red-600 rounded-md p-2'
              onClick={(e) => handleDelete(e, note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Notecard;
