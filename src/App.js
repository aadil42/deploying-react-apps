import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// import BlogPage from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, 
            element: 
            <Suspense fallback={<p>Loading...</p>}>
              <BlogPage />
            </Suspense>, 
            loader: (meta) => {
              return import('./pages/Blog').then((module) => module.loader())
            }},
          { path: ':id', 
            element: 
            <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
            </Suspense>, 
            loader: (meta) => {
              return import('./pages/Post').then((module) => module.loader(meta))
            }},
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
