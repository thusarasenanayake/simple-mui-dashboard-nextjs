import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import DashboardLayout from '../../../layouts/dashboard-layout';
import { Box, IconButton, Stack } from '@mui/material';
import { Delete, Reply, StarBorder } from '@mui/icons-material';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getFirstChar } from '../../../helpers/strings';

const prisma = new PrismaClient();

export default function Email({ emails }) {
    return (
        <DashboardLayout>
            <Box
                sx={{
                    maxHeight: '70vh',
                    overflow: 'scroll',
                }}
            >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    {emails.map((email) => (
                        <Box key={email.id}>
                            <Link
                                href={'mails/' + email.id}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        color: 'inherit',
                                        ':hover': { color: 'darkred' },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ pt: 0.75 }}>
                                            {getFirstChar(email.from_name)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={email.subject}
                                        secondary={
                                            <Fragment>
                                                <Typography
                                                    sx={{
                                                        textOverflow:
                                                            'ellipsis',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: '2',
                                                        WebkitBoxOrient:
                                                            'vertical',
                                                    }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    <strong>
                                                        {email.from_name +
                                                            ' : '}
                                                    </strong>
                                                    {email.content}
                                                </Typography>
                                            </Fragment>
                                        }
                                    />
                                </ListItem>
                            </Link>
                            <Stack direction="row" sx={{ pl: 2 }}>
                                <IconButton aria-label="reply" color="success">
                                    <Reply />
                                </IconButton>
                                <IconButton
                                    aria-label="favourite"
                                    color="warning"
                                >
                                    <StarBorder />
                                </IconButton>
                                <IconButton aria-label="delete" color="error">
                                    <Delete />
                                </IconButton>
                            </Stack>
                            <Divider variant="inset" component="li" />
                        </Box>
                    ))}
                </List>
            </Box>
        </DashboardLayout>
    );
}
export async function getServerSideProps() {
    // await setTimeout(function () {}, 5000);

    const emails = await prisma.email.findMany();

    return {
        props: { emails: JSON.parse(JSON.stringify(emails)) },
    };
}
