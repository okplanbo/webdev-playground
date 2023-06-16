//import { format } from 'date-fns'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './Todo.module.scss';

function createData(
  description: string,
  done: boolean,
  dateAdded: Date,
  deadline?: Date | null,
) {
  return { done, description, dateAdded, deadline };
}
// format. add editing mode
const rows = [
  createData('Frozen yoghurt', false, new Date(), null),
  createData('Ice cream sandwich', false, new Date(), null),
  createData('Eclair', true, new Date(), null),
  createData('Cupcake', true, new Date(), new Date()),
  createData('Gingerbread', false, new Date(), null),
];

export default function Todo() {
  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Date added</TableCell>
            <TableCell align="right">Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.done ? 'ok' : 'not'}</TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              {/* <TableCell align="right">{row.dateAdded}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}