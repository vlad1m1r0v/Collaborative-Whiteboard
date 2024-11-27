import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, WhiteboardPage, RedirectPage } from '@/pages';
import { WhiteboardProvider } from '@/context';
import AuthGuard from '@/components/AuthGuard/AuthGuard.tsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="redirect" element={<RedirectPage />} />
        <Route element={<AuthGuard />}>
          <Route path="whiteboards/" element={<HomePage />} />
          <Route path="whiteboards/:uuid" element={
            <WhiteboardProvider>
              <WhiteboardPage />
            </WhiteboardProvider>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;