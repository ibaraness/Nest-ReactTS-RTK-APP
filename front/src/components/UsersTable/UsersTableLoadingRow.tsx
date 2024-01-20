import { Skeleton, TableRow, TableCell } from '@mui/material';

const UsersTableLoadingRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant='rounded' sx={{ ml: 2, mb: 0 }} height={30}></Skeleton>
            </TableCell>
            <TableCell>
                <Skeleton variant='rounded' sx={{ ml: 2, mb: 0 }} height={30}></Skeleton>
            </TableCell>
            <TableCell>
                <Skeleton variant='rounded' sx={{ ml: 2, mb: 0 }} height={30}></Skeleton>
            </TableCell>
        </TableRow>
    )
}

export default UsersTableLoadingRow;