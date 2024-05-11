import { Injectable } from '@nestjs/common';
import * as querystring from 'qs';
import * as crypto from 'crypto';
import { format } from 'date-fns';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService) {}
  async VNPayCheckoutUrl(resId, cost) {
    let date = new Date();

    // This should in config file
    let tmnCode = 'I6EZX61U';
    let secretKey = 'TBWZANCWBXNATETKLUEOLFHTKPNBSPBM';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    let returnUrl = 'http://localhost:3000/reservation/';
    let createDate = format(date, 'yyyyMMddHHmmss');
    let orderId = date.getTime();

    // The amount need to paid
    let amount = cost;

    // VNPAYQR - VNBANK - INTCARD
    let bankCode = 'VNBANK';

    // vn - en
    let locale = 'vn';

    if (locale === null || locale === '') {
      locale = 'vn';
    }
    let currCode = 'VND';

    let vnp_Params = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = cost * 100; // The amount need to mutiple with 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = '118.70.192.52'; // this is ip address of cilent
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    var code = vnp_Params['vnp_ResponseCode'];
    return {vnpUrl,code};
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  VNPayReturn(resId,req: any) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this.sortObject(vnp_Params);
    var code = vnp_Params['vnp_ResponseCode'];
    let secretKey = 'TBWZANCWBXNATETKLUEOLFHTKPNBSPBM';

    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      console.log(code);
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      return {
        code: '00',
        message: 'Giao dịch hợp lệ',
      };
    } else {
      return { code: '97', message: 'Chữ ký không hợp lệ' };
    }
    
  }
  handleVNPayIPN(vnpParams: any) {
    const secureHash = vnpParams['vnp_SecureHash'];

    // Loại bỏ các tham số không cần thiết
    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = this.sortObject(vnpParams);

    // Đọc secretKey từ file cấu hình
    const secretKey = this.configService.get<string>('vnp_HashSecret');

    // Tạo chuỗi ký tự cần ký và tạo chữ ký
    const queryString = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(queryString, 'utf-8')).digest('hex');

    // Kiểm tra chữ ký
    if (secureHash === signed) {
      const orderId = vnpParams['vnp_TxnRef'];
      const rspCode = vnpParams['vnp_ResponseCode'];
      // Kiểm tra dữ liệu và cập nhật trạng thái đơn hàng (nếu cần)
      return { RspCode: '00', Message: 'success' };
    } else {
      return { RspCode: '97', Message: 'Fail checksum' };
    }
  }

  // Phương thức sắp xếp các tham số theo thứ tự alphabet
}
