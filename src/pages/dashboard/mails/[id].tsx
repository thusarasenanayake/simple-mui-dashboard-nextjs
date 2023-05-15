import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import prisma from '../../../../prisma/prisma-client';
// import { setTimeout } from 'timers/promises';
import DashboardLayout from '../../../layouts/dashboard-layout';

export default function Page({ email }) {
    return (
        <DashboardLayout>
            <Card>
                {/* <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {email.from_name}
                        <a
                            style={{ color: 'skyblue', paddingLeft: 10 }}
                            href={'mailto:' + email.from_email}
                        >
                            {'<' + email.from_email + '>'}
                        </a>
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        {email.subject}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {email.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Forward</Button>
                    <Button size="small">Reply</Button>
                </CardActions>
            </Card>
        </DashboardLayout>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = setTimeout(() => {
        context.res.statusCode = 500;
        throw new Error('Internal Server Error');
    }, 7000);

    let email;

    try {
        email = await prisma.email.findFirst({
            where: {
                id: Number(context.params.id),
            },
        });
        clearTimeout(id);
        if (!email) {
            return {
                notFound: true,
            };
        }
        return {
            props: { email },
        };
    } catch (err) {
        throw new Error('Internal Server Error');
    }
}
