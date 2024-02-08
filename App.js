

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);


  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSortByName = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
  };

  
  const handlePastSearchSelect = pastSearch => {
    setSearchTerm(pastSearch);
  };

  
  useEffect(() => {
    if (searchTerm !== '' && !pastSearches.includes(searchTerm)) {
      setPastSearches([...pastSearches, searchTerm]);
    }
  }, [searchTerm, pastSearches]);

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSortByName}>Sort by Name</button>
      <h2>Past Searches:</h2>
      <ul>
        {pastSearches.map((search, index) => (
          <li key={index} onClick={() => handlePastSearchSelect(search)}>
            {search}
          </li>
        ))}
      </ul>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;