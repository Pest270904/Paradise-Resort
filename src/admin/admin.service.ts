import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2'

@Injectable()
export class AdminService {
    constructor(
        private prisma : PrismaService,
      ) {}

    async createAdmin()  {
        const hashedPassword = await hash('112233');
        await this.prisma.user.create({
            data:
                {
                    username: 'admin',
                    fullName: 'Admin User',
                    email: 'admin@example.com',
                    phoneNumber: null,
                    hash: hashedPassword,
                    isAdmin: true
            } })
    }
}
