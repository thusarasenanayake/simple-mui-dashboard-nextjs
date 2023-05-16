import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AppBar from '../../../components/dashboard/appbar';
import Drawer from '../../../components/dashboard/drawer';
import Footer from '../../../components/dashboard/footer';
import prisma from '../../../../prisma/prisma-client';
// import { setTimeout } from 'timers/promises';

const darkTheme = createTheme({
    palette: {
        // mode: 'dark',
    },
});

export default function Reports({ title, emails }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <AppBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
                <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        overflow: 'auto',
                        minHeight: '100vh',
                    }}
                >
                    <Toolbar />

                    <Container
                        maxWidth="lg"
                        sx={{
                            minHeight: '80vh',
                            py: 3,
                        }}
                    >
                        <h1>{title}</h1>

                        {emails.map((email, index) => (
                            <pre key={index}>
                                {JSON.stringify(email, null, 4)}
                            </pre>
                        ))}
                    </Container>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export async function getServerSideProps() {
    const emails = await prisma.email.findMany();

    return {
        props: { title: 'Email Reports', emails },
    };
}
