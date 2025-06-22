import React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';

const statusColors = {
  'To Do': 'default',
  'In Progress': 'primary',
  'Done': 'success'
};

const TaskList = ({ tasks, filters, setFilters, refreshTasks }) => {
  const theme = useTheme();

  const handleStatusUpdate = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
    refreshTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    refreshTasks();
  };

  /*const filtered = tasks.filter(task =>
    (!filters.status || task.status === filters.status) &&
    (!filters.assignee || (task.assignedTo && task.assignedTo.includes(filters.assignee)))
  );*/
  const filtered = tasks.filter(task =>
(!filters.status || task.status === filters.status) &&
(!filters.assignee || (task.assignedTo && task.assignedTo.toLowerCase().includes(filters.assignee.toLowerCase())))
);

return (
    <>
      <Typography variant="h5" sx={{ mt: 4 }}>Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {['To Do', 'In Progress', 'Done'].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Assignee"
            fullWidth
            value={filters.assignee}
            onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
          />
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
        Showing tasks with status: <strong>{filters.status || 'All'}</strong>
        ({filtered.length} shown)
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filtered.map(task => (
          <Grid item xs={12} md={6} key={task._id}>
            <Card sx={{ backgroundColor: theme.palette.background.paper }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography>{task.description}</Typography>
                <Typography>Assigned To: {task.assignedTo}</Typography>
                <Chip label={task.status} color={statusColors[task.status]} sx={{ mt: 1 }} />
              </CardContent>
              <CardActions>
                {['To Do', 'In Progress', 'Done'].map(opt => <Button key={opt} onClick={() => handleStatusUpdate(task._id, opt)}>{opt}</Button>)}
                <Button color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TaskList;
