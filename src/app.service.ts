import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class AppService {
  getViewName(): string {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }

  getTokenFromHeaderRequest(req : Request) {
    return req.rawHeaders.find(header => header.startsWith('jwt')).split('=')[1];
}

  getTokenFromHeaderResponse(res : Response) {
    return res.getHeaders()['set-cookie'].toString().split('=')[1].split(';')[0];
  }
}
