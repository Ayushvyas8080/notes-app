import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const NoteDetailPage = () => {
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);

        setNote(res.data.data);
      } catch (error) {
        console.log('Error in fetching note', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      return;
    }
    setSaving(true);

    try {
      const updatedNote = {
        title: note.title,
        content: note.content,
      };
      await api.put(`/notes/${id}`, updatedNote);
      navigate('/home');
    } catch (error) {
      console.log('Error saving note: ', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className='text-white text-2xl font-bold'>Loading...</div>;
  }
  return (
    <div className='flex  justify-center'>
      <div className='text-white bg-zinc-900 m-10 p-6 rounded-md'>
        <div>
          <div className='flex bg-neutral-800 items-center justify-center m-2  w-10 rounded-md text-3xl'>
            <Link to={'/home'}>←</Link>
          </div>
          <div>
            <div>
              <div className='flex flex-col'>
                <label>
                  <span className='font-bold'>Title</span>
                </label>
                <input
                  className='bg-neutral-600 m-2 p-2 rounded-md'
                  placeholder='Note Title'
                  type='text'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                ></input>
              </div>
              <div className='flex flex-col'>
                <label>
                  <span className='font-bold'>Content</span>
                </label>
                <textarea
                  className='bg-neutral-600 m-2 p-2 rounded-md'
                  placeholder='Write Notes'
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className='flex justify-center'>
                <button
                  className='font-bold cursor-pointer bg-green-600 hover:bg-green-700 rounded-md p-2'
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
