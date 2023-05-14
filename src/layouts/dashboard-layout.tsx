import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Router } from 'next/router';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBar from '../components/dashboard/appbar';
import Drawer from '../components/dashboard/drawer';
import Footer from '../components/dashboard/footer';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        // mode: 'dark',
    },
});

export default function DashboardLayout({ children }) {
    const [loading, setLoading] = useState(false);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

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
                    {loading && (
                        <LinearProgress color="success" sx={{ mt: '3px' }} />
                    )}
                    <Container
                        maxWidth="lg"
                        sx={{
                            minHeight: '80vh',
                            py: 3,
                        }}
                    >
                        {!loading && children}
                    </Container>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
