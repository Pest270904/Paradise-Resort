import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async getAllRoom() {
    const foundRoom = await this.prisma.room.findMany();
    return { room: foundRoom }
  }

  async getRoomById(roomId: any) {
    const foundRoom = await this.prisma.room.findUnique({
        where: {
          id: Number(roomId),
        },
    });

    if (!foundRoom) 
      return { error_noRoom: 'Room not found' };

    return { room: foundRoom }
  }

  async createRoom() {
    await this.prisma.room.createMany({
      data: [
        {
          roomName: 'DELUXE DOUBLE ROOM',
          description: 'With an area of 32 square meters, the Deluxe Double Room is a modernly designed hotel room featuring a luxurious double bed and fully integrated amenities for your stay. Enjoy expansive views and a prime location right next to the beach, making it an ideal choice for couples, small families, or business travelers.',
          cost: 990000,
          imgSrc: '/img/rooms/deluxe-double-room.webp',
          btnExpId: 'btn-desc-1',
          parExpId: 'expd1',
          divExpId: 'view1',
          available: 3,
        },
        {
          roomName: 'DELUXE TWIN ROOM',
          cost: 1490000,
          description: 'With an area of 32 square meters, the Deluxe Twin Room is a modernly designed hotel room featuring two luxurious single beds and fully integrated  amenities for your stay. Enjoy expansive views and a prime location right next to the beach, making it an ideal choice for couples, small families, or business travelers.',
          imgSrc: '/img/rooms/twin-room.webp',
          btnExpId: 'btn-desc-2',
          parExpId: 'expd2',
          divExpId: 'view2',
          available: 3,
        },
        {
          roomName: 'GRAND DELUXE DOUBLE ROOM',
          cost: 1900000,
          description: 'With an area of 42 square meters, the Grand Deluxe Double Room is a modernly designed hotel room featuring a luxurious double bed and fully integrated amenities for your stay. Enjoy expansive views and a prime location right next to the beach, making it an ideal choice for couples, small families, or business travelers.',
          imgSrc: '/img/rooms/grand-double-room.webp',
          btnExpId: 'btn-desc-3',
          parExpId: 'expd3',
          divExpId: 'view3',
          available: 3,
        },
        {
          roomName: 'THE BEACHFRONT VILLA',
          cost: 3590000,
          description: 'With an area of 370 square meters and 3 bedrooms, this luxurious villa boasts a smart design and fully integrated amenities for your stay. Enjoy sweeping ocean views, spacious two-story layout, windows facing the sea, and a private secluded swimming pool. This will be an ideal choice for families, groups of leisure travelers, or business retreats',
          imgSrc: '/img/rooms/The-frontbeach-villa.webp',
          btnExpId: 'btn-desc-4',
          parExpId: 'expd4',
          divExpId: 'view4',
          available: 3,
        },
      ],
    })
  }
}
