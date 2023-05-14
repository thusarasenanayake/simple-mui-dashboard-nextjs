import {
    Alert,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DashboardLayout from '../../layouts/dashboard-layout';
import { Add, Delete } from '@mui/icons-material';
import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

export default function Users() {
    const { data, error } = useSWR('/api/users', fetcher);

    return (
        <DashboardLayout>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="primary" startIcon={<Add />}>
                    Add
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete />}>
                    Delete
                </Button>
            </Stack>

            <Paper
                sx={{ p: 2, display: 'flex', flexDirection: 'column', mt: 5 }}
            >
                <h3>Users</h3>

                {!error && !data?.users && (
                    <CircularProgress color="secondary" />
                )}
                {error && <Alert severity="error">{error.message}</Alert>}
                {data?.users && (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Joined On</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            user.createdAt
                                        ).toDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        </DashboardLayout>
    );
}
