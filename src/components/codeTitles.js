import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CodeTitles = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('https://online-coding-server-production-8bf8.up.railway.app/records')
      .then(response => response.json())
      .then(data => setRecords(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <span className='heading'>Choose code block</span>
      <ul>
        {records.map(record => (
          <li key={record.title}>
            <Link to={`/${record.title}`}>{record.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeTitles;
