import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Fragment } from 'react';
import { Mail } from '@mui/icons-material';
import Link from 'next/link';
import { Badge } from '@mui/material';
import { useRouter } from 'next/router';

const urls = {
    '/': '/dashboard',
    mails: '/dashboard/mails',
    users: '/dashboard/users',
    reports: '/dashboard/reports',
};

export function MainListItems() {
    const { pathname } = useRouter();

    return (
        <Fragment>
            <Link
                href={urls['/']}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <ListItemButton selected={pathname === '/dashboard'}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItemButton>
            </Link>
            <Link
                href={urls.mails}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <ListItemButton selected={pathname.startsWith(urls.mails)}>
                    <ListItemIcon>
                        <Mail />
                    </ListItemIcon>
                    <ListItemText primary="E-mails" />
                </ListItemButton>
            </Link>

            <Link
                href={urls.users}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <ListItemButton selected={pathname.startsWith(urls.users)}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </Link>

            <Link
                href={urls.reports}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <ListItemButton selected={pathname.startsWith(urls.reports)}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>
            </Link>

            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItemButton>
        </Fragment>
    );
}

export const secondaryListItems = (
    <Fragment>
        <ListSubheader component="div" inset>
            Archives
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <Badge badgeContent={1} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItemButton>
    </Fragment>
);
