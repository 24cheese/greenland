import query from '../db.js';
import moment from 'moment';
import crypto from 'crypto';
import qs from 'qs';

// 1. API tạo URL thanh toán
export const createPaymentUrl = (req, res) => {
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;

    let tmnCode = process.env.VNP_TMN_CODE;
    let secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURN_URL;

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderId = moment(date).format('HHmmss');

    let amount = req.query.amount;
    let userId = req.query.userId;
    let userName = req.query.userName;
    let userEmail = req.query.userEmail;
    let projectId = req.query.projectId;

    let orderInfo = `Thanh toan cho du an ${projectId}`;
    let orderType = 'donation';
    let locale = 'vn';
    let currCode = 'VND';

    let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: orderType,
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };

    // Sắp xếp param
    vnp_Params = sortObject(vnp_Params);

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    res.json({ paymentUrl: vnpUrl });
};

// 2. API VNPay gọi về khi thanh toán xong
export const vnpayReturn = async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", process.env.VNP_HASH_SECRET);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        // Chỉ lưu khi thanh toán thành công
        if (vnp_Params['vnp_ResponseCode'] === '00') {
            try {
                await query(
                    `INSERT INTO donors (user_id, name, email, amount, project_id, transaction_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        req.query.userId,
                        req.query.userName,
                        req.query.userEmail,
                        vnp_Params['vnp_Amount'] / 100,
                        req.query.projectId,
                        vnp_Params['vnp_TxnRef']
                    ]
                );
                return res.redirect('/payment-success'); // frontend hiển thị thành công
            } catch (err) {
                console.error('Lỗi lưu DB:', err);
                return res.redirect('/payment-error');
            }
        } else {
            return res.redirect('/payment-failed');
        }
    } else {
        return res.redirect('/payment-error');
    }
};

// Hàm sắp xếp param
function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
}
