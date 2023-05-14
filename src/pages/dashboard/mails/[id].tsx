import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
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
    const prisma = new PrismaClient();

    const email = await prisma.email.findFirst({
        where: {
            id: Number(context.params.id),
        },
    });

    if (!email) {
        return {
            notFound: true,
        };
    }

    return {
        props: { email: JSON.parse(JSON.stringify(email)) },
    };
}
