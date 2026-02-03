import { Route, Routes } from 'react-router';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className='w-screen h-screen bg-black'>
      <Routes>
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/home/create' element={<CreatePage />} />
        <Route path='home/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
