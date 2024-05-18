import { useEffect, useState } from 'react';
import {
  Box, Card, Table, TableRow, TableHead, TableBody, TableCell,
  Typography, TableContainer, Button, CircularProgress, Alert,
  IconButton, Tooltip
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon, Download as DownloadIcon } from '@mui/icons-material';
// import { fetchModels, deleteModel } from 'src/api/dataApi'; // Assume these functions are defined

const TabModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const fetchedModels = await fetchModels();
      // setModels(fetchedModels);
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id) => {
    // if (loading) return;

    // setLoading(true);
    // const success = await deleteModel(id);

    // if (success) {
    //   displayAlert(true, 'Model deleted successfully');
    //   setModels(models.filter(model => model._id !== id));
    // } else {
    //   displayAlert(false, 'Error deleting model');
    // }

    // setLoading(false);
  };

  const displayAlert = (success, message) => {
    setNotify({ success, message });
    setTimeout(() => setNotify(null), 3000);
  };

  return (
    <Card>
      {loading && <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Model Name</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model._id}>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.version}</TableCell>
                <TableCell>{model.status}</TableCell>
                <TableCell>{new Date(model.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(model.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton href={`/models/${model._id}`}><VisibilityIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton href={`/models/edit/${model._id}`}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(model._id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton href={`/models/download/${model._id}`}><DownloadIcon /></IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {notify && (
        <Alert severity={notify.success ? "success" : "error"} style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          {notify.message}
        </Alert>
      )}
    </Card>
  );
};

export default TabModels;
