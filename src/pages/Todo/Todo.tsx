import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import styles from './Todo.module.scss';

interface ITask {
  id: number;
  description: string | null;
  done: boolean;
  dateAdded: Date;
  deadline: Date | null;
}

const savedTasks = localStorage.getItem('tasks');

const tempDefault = {
  description: null,
  deadline: null
}

const widthLimit = 700;

const today = new Date();

function createData(id: number, description: string, done: boolean, dateAdded: Date, deadline: Date | null): ITask {
  return { id, description, done, dateAdded, deadline };
}

const initialRow: ITask[] = [
  createData(1, 'Sample Task 1', false, today, new Date('12-05-2050'))
];

export default function Todo() {
  const [rows, setRows] = useState<ITask[]>(savedTasks ? JSON.parse(savedTasks) : initialRow);
  const [temp, setTemp] = useState<Partial<ITask>>(tempDefault);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [deleteCandidate, setDeleteCandidate] = useState<number | null>(null);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const isDescriptionEmpty = temp.description === '';
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function handleResize() {
    setInnerWidth(window.innerWidth);
  }

  const saveTask = () => {
    if (!temp.deadline || !temp.description || temp.deadline < today) {
      setIsHintVisible(true);
    }

    if (temp.description && temp.deadline) {
      const task = createData(
        rows.length + 1,
        temp.description,
        false,
        today,
        temp.deadline
      );
      const updatedRows = temp.id
        ? rows.map(item => item.id === temp.id ? temp : item)
        : [...rows, task]
      setRows(updatedRows as ITask[]);
      saveToStorage(updatedRows as ITask[]);
      setTemp(tempDefault);
      setAddTaskModalOpen(false);
      setIsHintVisible(false);
    }
  };

  const editTask = (id: number) => {
    const row = rows.find(item => item.id === id);
    setTemp({...row, deadline: new Date(row?.deadline || today)} as ITask);
    setAddTaskModalOpen(true)
  };

  const toggleDone = (id: number, value: boolean) => {
    const updatedRows = rows.map((row) =>
      row.id !== id ? row : { ...row, done: value }
    )
    setRows(updatedRows);
    saveToStorage(updatedRows);
  };

  const saveToStorage = (rows: ITask[]) => {
    localStorage.setItem('tasks', JSON.stringify(rows));
  }

  const confirmDeleteTask = (id: number) => {
    setDeleteConfirmOpen(true);
    setDeleteCandidate(id);
  };

  const deleteTask = (id: number) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    saveToStorage(newRows);
    setDeleteConfirmOpen(false);
  };

  const closeEditModal = () => {
    setAddTaskModalOpen(false);
    setTemp(tempDefault);
    setIsHintVisible(false);
  }

  const isMobile = innerWidth <= widthLimit; // TODO: redo with useMediaQuery?

  return (
    <>
      <div className={styles.wrapper}>
        {rows.length > 0 ? (
          <Table sx={{ minWidth: '40vw' }} aria-label="simple table" className={styles.todo}>
            <TableHead>
              <TableRow>
                <TableCell>Done</TableCell>
                <TableCell>Description</TableCell>
                {!isMobile && (
                  <TableCell align="right">Date added</TableCell>
                )}
                <TableCell align="right">Deadline</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className={row.done ? styles.done : ''}>
                  <TableCell>
                    <Checkbox
                      checked={row.done}
                      onChange={(e) => toggleDone(row.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell className={styles.description} title={!isMobile && row.description ? row.description : ''}>
                    {isMobile ? (
                      <Tooltip title={`${row.description}, added on ${format(new Date(row.dateAdded), 'PP')}`}>
                        <div style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                          {row.description}
                        </div>
                      </Tooltip>
                    ) : row.description}
                  </TableCell>
                  {!isMobile && (
                    <TableCell align="right">{format(new Date(row.dateAdded), 'PP')}</TableCell>
                  )}
                  <TableCell align="right">
                    {row.deadline ? format(new Date(row.deadline), 'PP') : null}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => editTask(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => confirmDeleteTask(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className={styles.empty}>No tasks yet. Click the add button to create a new task.</div>
        )}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddTaskModalOpen(true)}
          className={styles.add}
          size="medium"
        >
          <AddIcon />
        </Fab>
      </div>

      {/* Add/Edit modal */}
      <Dialog
        fullScreen={isMobile}
        open={addTaskModalOpen}
        onClose={() => closeEditModal()}
      >
        <DialogTitle>{temp.id ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent className={styles.form}>
          <TextField
            label="Description"
            fullWidth
            error={isDescriptionEmpty}
            margin="normal"
            inputProps={{ maxLength: 80 }}
            value={temp.description}
            onChange={(e) => setTemp({ ...temp, description: e.target.value })}
          />
          <DatePicker
            label="Deadline"
            disablePast
            value={temp.deadline}
            onChange={(newValue: Date | null) => setTemp({ ...temp, deadline: newValue })}
          />
          {isHintVisible ? (
            <p style={{ color: 'firebrick' }}>Fill description and future date</p>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeEditModal()} color="primary">
            Cancel
          </Button>
          <Button onClick={saveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog
        fullScreen={isMobile}
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Are you sure you want to delete this task? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteTask(deleteCandidate as number)} color="primary" autoFocus>
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
