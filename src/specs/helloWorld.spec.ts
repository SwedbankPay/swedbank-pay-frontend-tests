import { CardPayment } from 'swedbank-pay';
import { Guid } from 'guid-typescript';
import dotenv from 'dotenv';
dotenv.config();
async function createPurchase() {
    const merchantToken: string = process.env.merchantToken ? process.env.merchantToken : "";
    const merchantId: string = process.env.merchantId ? process.env.merchantId : "";
    const sessionId: Guid = Guid.create();
    const payment = new CardPayment({
        merchantToken: merchantToken,
        consumerIp: '1.2.3.4',
        sessionId: sessionId,
        testMode: true
    });
    return await payment.createPurchase({
        "intent": "Authorization",
        "currency": "NOK",
        "prices": [{
            "type": "CreditCard",
            "amount": 10005,
            "vatAmount": 0
        }],
        "description": "Automated test",
        "userAgent": "Mozilla/5.0 Postman",
        "language": "nb-NO",
        "pageStripdown": false,
        "urls": {
            "completeUrl": "https://en.wikipedia.org/wiki/Success",
            "cancelUrl": "https://en.wikipedia.org/wiki/Cancel",
            "callbackUrl": "https://en.wikipedia.org/wiki/callback",
            "termsOfServiceUrl": "https://en.wikipedia.org/wiki/Terms_of_service"
        },
        "payeeInfo": {
            "payeeId": merchantId,
            "payeeReference": sessionId.toString()
        }
    });    
}

describe("begin spec.", () => {
     it("get redirect URL", async done => {
         const purchase = await createPurchase();
         expect(purchase.getRedirectAuthorization()).toBeDefined();
     });
})