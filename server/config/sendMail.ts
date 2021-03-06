const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

// send mail
const sendEmail = async (to: string, url: string, text: string) => {
	const oAuth2Client = new OAuth2Client(
		CLIENT_ID,
		CLIENT_SECRET,
		OAUTH_PLAYGROUND,
	);

	oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

	try {
		const access_token = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: SENDER_MAIL,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				access_token,
			},
		});

		const mailOptions = {
			from: SENDER_MAIL,
			to,
			subject: "Блог веб-разработки",
			html: `
                <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%">
                    <h2 style="text-transform: uppercase; color: teal;">
                        Добро пожаловать на блог по веб-разработке
                    </h2>
                    <p>Почти готово</p>
                    <a href="${url}" style="background: "#dc143c"; text-decoration: none; color: "#ffffff"; padding: 10px 20px;
                        margin: 10px 0; display: inline-block;">
                        ${text}
                    </a>
                </div>
            `,
		};

		return await transport.sendMail(mailOptions);
	} catch (e) {
		console.log({ e });
	}
};

export default sendEmail;