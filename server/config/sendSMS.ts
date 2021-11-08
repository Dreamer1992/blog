import {Twilio} from 'twilio';

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const serviceID = `${process.env.TWILIO_SERVICE_ID}`;

const client = new Twilio(accountSid, authToken);

export const sendSms = (to: string, body: string, txt: string) => {
    try {
        client.messages
            .create({
                body: `Блог веб-разработки ${txt} - ${body}`,
                from,
                to
            })
            .then(message => console.log(message.sid));
    } catch (e) {
        console.log(e);
    }
}

export const smsOTP = async (to: string, channel: string) => {
    try {
        const data = await client
            .verify
            .services(serviceID)
            .verifications
            .create({
                to,
                channel,
            });

        return data;
    } catch (e: any) {
        console.log(e);
    }
}

export const smsVerify = async (to: string, code: string) => {
    try {
        return await client
            .verify
            .services(serviceID)
            .verificationChecks
            .create({
                to,
                code,
            });
    } catch (e: any) {
        console.log(e);
    }
}

export default sendSms;