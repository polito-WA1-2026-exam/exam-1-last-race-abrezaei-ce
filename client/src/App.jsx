import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

function App() {
  return (
    <>

      <div className='container mx-auto'>
        <Alert>
          <AlertTitle>Web Application</AlertTitle>
          <AlertDescription>
            This is a test!
          </AlertDescription>
        </Alert>
      </div>

    </>
  )
}

export default App
