import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Editor from "@monaco-editor/react";



const CodeEdit = () => {
  const { title } = useParams();
  const [code, setCode] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const socket = useRef(null);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    console.log(title);
    socket.current = io('localhost:4000', {
        query:  {title} ,
    });
    console.log("WebSocket created for user");

    // Fetch initial code from the server and set it in the 'code' state
    fetch(`localhost:4000/record/${title}`)
      .then(response => response.json())
      .then(data => setCode(data.code))
      .catch(error => console.error('Error fetching code:', error));

    // Handle WebSocket updates
    socket.current.on('codeUpdated', ({ updatedTitle, updatedCode }) => {
    console.log('Received codeUpdated event:', { updatedTitle, updatedCode });
        setCode(prevCode => {
      return updatedCode;
    }); 
    });
    socket.current.on('readOnlyStatus', ({ readOnly: readOnlyStatus }) => {
        setReadOnly(readOnlyStatus);
    });

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      socket.current.close();
    };
  }, [title]);

  const handleCodeChange = updatedCode => {
    // Send code updates to the server via WebSocket
    socket.current.emit('updateCode', { title, updatedCode });
    // Update the local state immediately
    setCode(updatedCode);
  };


  return (readOnly? (<div>
    <h2>Read Code for: {title}</h2>
    <Editor
        language="javascript"
        options={{readOnly: true}}
        height="300px"
        width="800px"
        value={code}
        onChange={(newValue) => handleCodeChange(newValue/*e.target.value*/)}
      />
  </div>) : 
  (<div>
      <h2>Edit Code for: {title}</h2>
      <Editor
        language="javascript"
        height="300px"
        width="800px"
        value={code}
        onChange={(newValue) => handleCodeChange(newValue/*e.target.value*/)}
      />
    </div>)
  );
};

export default CodeEdit;
