import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { format } from 'date-fns'
import { FuncService } from 'src/func/func.service'

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly funcService: FuncService
  ) {}

  // ---------------------------------- Get info of all reservation base on username, plus some info of references room ----------------------------------
  async getAllReservation(req: Request) {
    const decoded_username  = this.funcService.getUsernameFromJwt_Req(req).username

    // Get user from username
    const user = await this.prisma.user.findUnique({
        where: {
            username: decoded_username,
        },
        select: {
            id: true
        }
    })

    // Get reseravtions based on user_id
    const reservations = await this.prisma.reservation.findMany({
        where: {
            user_id: user.id
        }
    })

    // Add "imgSrc" and "roomName" fields of referenced room to each reservation
    const processedReservations = await Promise.all(
      reservations.map(async (element) => {
        const room = await await this.prisma.room.findUnique({
            where: {
                id: Number(element.room_id)
          }
        })

        // format booking time
        const formattedBookingTime = format( element['booking_time'], 'HH:mm:ss dd-MM-yyyy');
        element['booking_time_display'] = formattedBookingTime
        delete element.booking_time // delete booking_time fields

        // Add 2 new fields to each reservation
        element['imgSrc'] = room.imgSrc
        element['roomName'] = room.roomName

        // add field to display status for each reservation
        if (element.status === 0) 
            element['Active'] = 1
        else if (element.status === 1) 
            element['Pending'] = 1
        else if (element.status === 2)
            element['End'] = 1
        else if (element.status === 3) 
            element['Completed'] = 1
        return element;
      })
    )

    processedReservations.sort((a, b) => a.status - b.status)

    return { reservations: processedReservations }
  }

  // ---------------------------------- Create reservation ----------------------------------
  async create(reqData: any, res: Response) {
    try {
      // Get user references base on reqData.userId
      const user = await this.prisma.user.findFirst({
        where: {
            id: Number(reqData.userId)
        },
        select: {
            id: true
        }
      })

      // Get room references base on reqData.roomId
      const room = await this.prisma.room.findFirst({
        where: {
            id: Number(reqData.roomId),
        },
        select: {
            id: true,
            available: true,
            cost: true
        }
      })

      // format start date from mm-dd-yyyy to dd-mm-yyyy
      reqData.start = format(reqData.start, 'dd-MM-yyyy')

      // If there is no available room
      if (room.available === 0) {
        res.cookie('error', 'This room is no longer available').redirect(`/room/${room.id}`);
      } else {
        // Create new reservation
        await this.prisma.reservation.create({
            data: {
                user_id: user.id,
                room_id: room.id,
                fullName: reqData.fullName,
                phoneNumber: reqData.phoneNumber,
                start: reqData.start,
                days: Number(reqData.days),
                total_cost: Number(reqData.days) * room.cost,
                status: 1
            }
        })

        // Update available room (decrease by 1)
        await this.prisma.room.update({
            where: {
                id: room.id
            },
            data: {
                available: {
                    decrement: 1
                }
            }
        })

        // redirect to reservation page when finished
        res.redirect(`/reservation`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // ---------------------------------- Cancel reservation ----------------------------------
  async cancel(reservation_id) {
    await this.prisma.reservation.update({
        where: {
            res_id: Number(reservation_id),
        },
        data: {
            status: 2
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

    // Update available room (increase by 1)
    await this.prisma.room.update({
        where: {
            id: reservation.room_id,
        },
        data: {
            available: {
            increment: 1
            }
        }
    })
  }

  // ---------------------------------- Success reservation ----------------------------------
  async success(reservation_id) {
    await this.prisma.reservation.update({
        where: {
            res_id:  Number(reservation_id)
        },
        data: {
            status: 0
        }
    })
  }
}
