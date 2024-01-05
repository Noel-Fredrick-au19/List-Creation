import './App.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListCreationView from './components/ListCreationView';
import { useCreateListStore } from '../src/stores/CreateListStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const queryClient = new QueryClient();

const App = () => {
  return (
    // <div className="align-center flex flex-col justify-center h-screen">
    <>
      <QueryClientProvider client={queryClient}>
        {useCreateListStore.Provider}
        <ListCreationView />
        {useCreateListStore.Provider}
      </QueryClientProvider>

      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
};

export default App;

