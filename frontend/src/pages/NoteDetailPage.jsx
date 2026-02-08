import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();


  useEffect(()=> {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
      }
    }
  })
  return (
    <div>
      <div>
        <div>
          <div>
            <Link to={'/'}>Back to Notes</Link>
            <button>Delete</button>
          </div>
          <div>
            <div>
              <div>
                <label>
                  <span>Title</span>
                </label>
                <input
                  placeholder='Note Title'
                  type='text'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                ></input>
              </div>
              <div>
                <label>
                  <span>Content</span>
                </label>
                <textarea
                  placeholder='Write Notes'
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div>
                <button>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
