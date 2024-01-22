import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    Alert,
    Box
} from '@mui/material';
import { useMemo } from 'react';
import UsersTableRow from './UsersTableRow';
import { useGetUsersQuery, selectAllUsers } from '../../features/users/usersSlice';
import {
    selectSelectedUserId,
    selectVisibleRows,
    selectPageNum,
    setPageNum,
    selectRowsPerPage,
    setRowsPerPage,
    setSelectedUserId
} from '../../features/users/usersUISlice';
import BarTitle from '../shared/BarTitle';
import UsersTableLoadingRow from "./UsersTableLoadingRow";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from "../../features/users/usersSlice";
import { getErrorMessage } from '../../services/helpers';
import UsersSearchBar from './UsersSearchBar';

const UsersTable = () => {

    // Initiate users loading to and from the cache
    // Getting loading and error status
    const { isLoading, isError, error } = useGetUsersQuery(undefined);
    const dispatch = useAppDispatch();

    // Get error message from the error object, or returns a default error message
    const errorMessage = isError && getErrorMessage(error);

    // Loading appropriate state segments
    const selectedUserId: number | null = useAppSelector(selectSelectedUserId);
    const rowsPerPage: number = useAppSelector(selectRowsPerPage);
    const currentPage: number = useAppSelector(selectPageNum);
    const users: User[] = useAppSelector(selectAllUsers);
    const visibleUserRows: User[] = useAppSelector(selectVisibleRows);

    // Number of skeleton rows the table should display durring loading
    const loadingRowsNum = 3;

    const handleChangePage = (pageNum: number) => {
        dispatch(setPageNum(pageNum));
    };

    const handleChangeRowsPerPage = (rowPerPage: string) => {
        dispatch(setRowsPerPage(parseInt(rowPerPage, 10)))
        dispatch(setPageNum(0));
    };

    const resetSelectedUserId = () => {
        dispatch(setSelectedUserId(null));
    }

    // Caching skeleton, user rows andd empty rows to avoid recalculation of rows for each render
    const userRows = useMemo(() => createUserRows(visibleUserRows, selectedUserId), [visibleUserRows, selectedUserId])
    const emptyRows = useMemo(() => createEmptyRows(currentPage, rowsPerPage, users.length), [currentPage, rowsPerPage, users]);
    const loadingRows = useMemo(() => creatUserLoadingRows(loadingRowsNum), [loadingRowsNum]);

    return (
        <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
            <BarTitle
                title="Users Table"
                isShowButton={true}
                buttonText='Diselect user'
                onClick={() => resetSelectedUserId()}
            ></BarTitle>
            {/* Display error alert message on error laoding users */}
            {
                isError && <Box sx={{ px: 2 }}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Box>
            }
            <UsersSearchBar></UsersSearchBar>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Company Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Toggle betweem showing skeleton or user rows if done loading */}
                        {
                            isLoading ? loadingRows : userRows
                        }

                        {/* Fill the missing space when table is not full */}
                        {
                            emptyRows
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={(_, pageNum) => handleChangePage(pageNum)}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event.target.value)}
            />
        </Paper>

    )
}
export default UsersTable;

// Putting user rows creation in a method for later caching, instead of recreting for each render
const createUserRows = (visibleUserRows: User[], selectedUserId: number | null) => visibleUserRows.map(user => (
    <UsersTableRow key={user.id} user={user}
        selected={selectedUserId === user.id}
    ></UsersTableRow>
))

// Calcualte how many empty rows should be added to fill missing space in table, 
// when table page is not full (Avoid a layout jump)
const createEmptyRows = (pageNum: number, rowsPerPage: number, userCount: number) => {
    const emptyRows = pageNum > 0 ? Math.max(0, (1 + pageNum) * rowsPerPage - userCount) : 0;
    return emptyRows > 0 && (
        <TableRow
            style={{
                height: 53 * emptyRows,
            }}
        >
            <TableCell colSpan={3} />
        </TableRow>
    )
}

// Putting loadnig rows creation in a method for later caching, instead of recreting for each render
const creatUserLoadingRows = (rowsNum: number) => {
    const rows = [];
    for (let i = 0; i < rowsNum; i++) {
        rows.push(<UsersTableLoadingRow key={i}></UsersTableLoadingRow>);
    }
    return rows;
}

