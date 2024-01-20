import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { setSelectedUserId, } from '../../features/users/usersUISlice';
import { User } from "../../features/users/usersSlice";
import { useAppDispatch } from '../../app/hooks';

interface UsersTableRowProps {
    user: User;
    selected: boolean;
}

const UsersTableRow = ({ user, selected = false }: UsersTableRowProps) => {
    const { id, name, email, companyName } = user;

    const dispatch = useAppDispatch(); 

    function handleSelectedRow(userId: number) {
        dispatch(setSelectedUserId(userId));
    }

    return (
        <TableRow
            key={id}
            hover
            selected={selected}
            onClick={() => handleSelectedRow(id)}
            sx={{ cursor: 'pointer' }}

        >
            <TableCell component="th" scope="row">{name}</TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">{companyName}</TableCell>
        </TableRow>
    )
}
export default UsersTableRow;