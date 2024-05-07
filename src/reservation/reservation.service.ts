import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    // Get info of all reservation base on username, plus some info of references room
    async getAllReservation(req : Request) {
        const token = req.cookies.jwt
        const decoded_username = this.jwtService.decode(token).username

        const user = await this.prisma.user.findUnique({
            where: {
                username : decoded_username
            },
            select : {
                id : true
            }
        })

        const reservations = await this.prisma.reservation.findMany({
            where: {
                user_id : user.id
            }
        })

        const processedReservations = await Promise.all(reservations.map(async (element) => {
            const room = await await this.prisma.room.findUnique({
                where: {
                    id: Number(element.room_id)
                }
            })
            element["imgSrc"] = room.imgSrc;
            element["roomName"] = room.roomName

            if(element.status === 0) 
                element["Active"] = 1
            else if (element.status === 1)
                element["Pending"] = 1
            else if (element.status === 2)
                element["End"] = 1

            return element;
        }));

        processedReservations.sort((a,b) => a.status - b.status)

        return {reservations : processedReservations}
    }

    // Cancel reservation
    async cancel(reservation_id) {
        await this.prisma.reservation.update({
            where: {
                res_id : Number(reservation_id)
            },
            data: {
                status : 2
            }
        })

        const reservation = await this.prisma.reservation.findUnique({
            where: {
                res_id: Number(reservation_id)
            },
            select: {
                room_id: true
            }
        })

        const room = await this.prisma.room.findUnique({
            where: {
                id: reservation.room_id
            },
            select: {
                available: true
            }
        })

        await this.prisma.room.update({
            where: {
                id: reservation.room_id
            },
            data: {
                available: ++room.available
            }
        })
    }
}
