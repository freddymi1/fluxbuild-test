import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { HomePage } from './pages/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import { statusConnextion } from './utils/connextionStatus';

function App() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<boolean | any>(false);
  console.log("online status", isOnline);
  
  statusConnextion(isOnline);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
    
  }, [isOnline]);

  

  return (
      <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
            toastStyle={error ? { backgroundColor: "red" } : { backgroundColor: "green"}}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
            {/* Same as */}
        <ToastContainer />
        {
          isOnline === false ? (
            <div data-testid="data-error" className={`container connex`}>
              <div className='text-center'>
                <h1 className='text-danger'>Oupssss!</h1><br />
                <h2>Votre connexion internet a été coupée, veuillez le verifier SVP!</h2>
              </div>
            </div>
          ):(

            <HomePage/>

          )
        }
      </>
  )
}

export default App
