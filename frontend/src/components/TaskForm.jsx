import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const TaskForm = ({ refreshTasks }) => {
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', status: 'To Do' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/tasks', form);
    setForm({ title: '', description: '', assignedTo: '', status: 'To Do' });
    refreshTasks();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}><TextField label="Title" name="title" fullWidth value={form.title} onChange={handleChange} /></Grid>
      <Grid item xs={12} sm={6}><TextField label="Assigned To" name="assignedTo" fullWidth value={form.assignedTo} onChange={handleChange} /></Grid>
      <Grid item xs={12}><TextField label="Description" name="description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} /></Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={form.status} onChange={handleChange}>
            {['To Do', 'In Progress', 'Done'].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}><Button variant="contained" color="primary" onClick={handleSubmit}>Add Task</Button></Grid>
    </Grid>
  );
};

export default TaskForm;