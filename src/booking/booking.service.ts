import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(private readonly prisma: PrismaService) {}

    async createReservation(reqData : any, res : Response) {
        try {
            // Get user references base on reqData.userId
            const user = await this.prisma.user.findFirst({
                where: {
                  id : Number(reqData.userId),
                },
                select: {
                  id: true,
                },
            });
    
            // Get room references base on reqData.roomId
            const room = await this.prisma.room.findFirst({
                where: {
                  id : Number(reqData.roomId),
                },
                select: {
                  id: true,
                  available: true,
                  cost: true
                },
            });

            // If there is no available room
            if(room.available === 0) {
                res.cookie('error', 'This room is out of stock').redirect(`/room/${room.id}`)
            }
            else {
                // Create new reservation
                await this.prisma.reservation.create({
                    data: {
                        user_id: user.id,
                        room_id: room.id,
                        fullName: reqData.fullName,
                        phoneNumber: reqData.phoneNumber,
                        start:  reqData.start,
                        days: Number(reqData.days),
                        total_cost: Number(reqData.days) * room.cost,
                        status: 0
                    }
                })

                // Update available room
                await this.prisma.room.update({
                    where: {
                        id: room.id
                    },
                    data: {
                        available: --room.available
                    }
                })

                res.redirect(`/reservation`)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
}
