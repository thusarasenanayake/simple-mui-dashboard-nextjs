import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Footer(props: any) {
    return (
        <Box>
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                p={2}
                {...props}
            >
                {'Copyright © '}
                <Link
                    color="inherit"
                    href={process.env.NEXT_PUBLIC_COMPANY_URL}
                >
                    {process.env.NEXT_PUBLIC_COMPANY_NAME}
                </Link>
                {' ' + new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}
