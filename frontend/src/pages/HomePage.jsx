import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard';
import { useState, useEffect } from 'react';
import api from '../utils/axios';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes/');
        console.log(res.data);
        setNotes(res.data.data);
      } catch (error) {
        console.log('Error fetching notes');
        console.error(error);
        console.log('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl p-4 m-2  '>
        {loading && <div className='text-white'>Loading notes...</div>}
        {!notes.length && (
          <div className='text-white text-xl font-bold '>Create New Note</div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
          {notes.map((note) => (
            <Notecard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
