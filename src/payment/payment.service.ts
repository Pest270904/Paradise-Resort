import { Injectable } from '@nestjs/common';
import * as querystring from 'qs';
import * as crypto from 'crypto';
import { format } from 'date-fns';

@Injectable()
export class PaymentService {
  async createPaymentUrl(amount: number, bankCode: string, orderDescription: string, orderType: string, language: string) {
    const ipAddr = '127.0.0.1'; // Tạm thời sử dụng localhost làm địa chỉ IP

    // Các giá trị cần thiết cho thanh toán VNPay từ tệp config
    const tmnCode = 'I6EZX61U';
    const secretKey = 'TBWZANCWBXNATETKLUEOLFHTKPNBSPBM';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3000/return';

    const date = new Date();
    const createDate = format(date, 'yyyyMMddHHmmss');
    const orderId = format(date, 'HHmmss');

    // Ngôn ngữ mặc định là 'vn' nếu không được chỉ định
    const locale = language || 'vn';
    const currCode = 'VND';

    // Thiết lập các tham số cho URL thanh toán VNPay
    const vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderDescription;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100; // Chuyển đổi số tiền thành đơn vị VNĐ
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = this.sortObject(vnp_Params);

    // Tạo chuỗi dữ liệu cần ký
    const signData = querystring.stringify(sortedParams, { encode: false });

    // Tạo mã ký từ dữ liệu đã được sắp xếp
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    // Thêm mã ký vào các tham số
    vnp_Params['vnp_SecureHash'] = signed;

    // Tạo URL thanh toán từ các tham số đã được xử lý
    const paymentUrl = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });

    return paymentUrl;
  }

  sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }


  VNPayReturn(req: any) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this.sortObject(vnp_Params);

    let secretKey = 'TBWZANCWBXNATETKLUEOLFHTKPNBSPBM';

    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      return { code: vnp_Params['vnp_ResponseCode'] };
    } else {
      return { code: 97 };
    }
  }
}
