import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CssBaseline, createTheme, ThemeProvider, Switch, FormControlLabel, Box } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  //const [filters, setFilters] = useState({ status: '', assignee: '' });
  const [filters, setFilters] = useState({ status: '', assignedTo: '' });

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
try {
const res = await axios.get('http://localhost:5000/api/tasks');
setTasks(res.data);
} catch (error) {
 console.error("Failed to fetch tasks:", error.message);
}
};

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ minHeight: '100vh', padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Collaborative Task Manager</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label={darkMode ? 'Dark Mode' : 'Light Mode'}
          />
        </Box>
        <TaskForm refreshTasks={fetchTasks} />
        <TaskList tasks={tasks} filters={filters} setFilters={setFilters} refreshTasks={fetchTasks} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
