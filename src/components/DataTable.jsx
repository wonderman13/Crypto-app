import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

DataTable.propTypes = {
    rows: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired
}

export default function DataTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowSelected, setRowSelected] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCoinInfo = (event, row) => {
    props.onRowClick(row);
  }

  return (
    <TableContainer component={Paper} data-name='crypto-coin-table'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell><strong>Coin Name</strong></TableCell>
            <TableCell align="justify" ><strong>Symbol</strong></TableCell>
            <TableCell align="justify"><strong>Sign</strong></TableCell>
            <TableCell align="justify"><strong>Current Price</strong></TableCell>
            <TableCell align="justify"><strong>Market Cap</strong></TableCell>
            <TableCell align="justify"><strong>Market Cap Rank</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {(rowsPerPage > 0
            ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.rows
          ).map((row) => (
            <TableRow 
                key={row.id} 
                onClick={e => getCoinInfo(e, row)}
                selected={row.selected}
            >
              <TableCell component="th" scope="row" style={{ width: 160 }} align={'justify'}>
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }}  align={'justify'}>
                {row.symbol}
              </TableCell>
              <TableCell style={{ width: 160 }}  align={'justify'}>
                <img alt={'does not show'} src={row.image} height={30} width={30}/>
              </TableCell>
              <TableCell style={{ width: 160 }}  align={'justify'}>
                {row.current_price}
              </TableCell>
              <TableCell style={{ width: 160 }}  align={'justify'}>
                {row.market_cap}
              </TableCell>
              <TableCell style={{ width: 160 }}  align={'justify'}>
                {row.market_cap_rank}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 30, 50, 100, { label: 'All', value: -1 }]}
              colSpan={6}
              count={props.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
