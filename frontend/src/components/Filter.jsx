import React, { useState } from 'react';

function Filter({ setFilters }) {
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const applyFilters = () => {
    setFilters({ status, assignedTo });
  };

  return (
    <div className="filter-bar">
      <select onChange={e => setStatus(e.target.value)} value={status}>
        <option value="">All Statuses</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <input placeholder="Assignee" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />
      <button onClick={applyFilters}>Apply</button>
    </div>
  );
}

export default Filter;
