import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';

function App() {
  const [responseFromC, setResponseFromC] = useState('No message yet');

  const handleButtonClick = async () => {
    try {
      if (window.Greeting) {
        const resultString = await window.Greeting("Hello !");
        
        console.log(resultString)
        setResponseFromC(resultString.message);
      } else {
        setResponseFromC("Error: callNativeC is not defined (Are you running in standard browser?)");
      }
    } catch (error) {
      console.error("Communication failed:", error);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <h1 className='mb-[10vh] text-5xl font-extrabold'>Welcome to RaC</h1>
      
      <Button className={"mb-3 mt-3"}>
        Send Request to C Backend
      </Button>

      <div  className='border  p-3 mt-4 rounded-lg '>
        <p>{responseFromC}</p>
      </div>


      <p className='fixed bottom-0 p-3'>
        Open App.tsx for editing
      </p>
    </div>
  )
}

export default App