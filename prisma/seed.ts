import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

// if (process.env.NODE_ENV === 'production') {
//     process.exit(1);
// }

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 50; i++) {
        await prisma.user.create({
            data: {
                // id: faker.datatype.uuid(),
                email: faker.internet.email(),
                name: faker.name.fullName(),
            },
        });
    }
    for (let i = 0; i < 50; i++) {
        await prisma.email.create({
            data: {
                content: faker.random.words(150),
                from_email: faker.internet.email(),
                from_name: faker.name.fullName(),
                subject: faker.random.words(10),
                time_received: faker.date.recent().getTime().toString(),
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        prisma.$disconnect();
        process.exit();
    });
