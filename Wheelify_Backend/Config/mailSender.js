import SibApiV3Sdk from "sib-api-v3-sdk";

const mailSender = async (email, title, body) => {
    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;

        const apiKey =
            defaultClient.authentications["api-key"];

        apiKey.apiKey = process.env.BREVO_API_KEY;

        const apiInstance =
            new SibApiV3Sdk.TransactionalEmailsApi();

        const result = await apiInstance.sendTransacEmail({
            sender: {
                email: process.env.MAIL_FROM,
                name: "Wheelify",
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: title,
            htmlContent: body,
        });

        console.log("Email sent successfully");

        return result;
    }
    catch (error) {
        console.error("Brevo Email Error:", error);
        throw error;
    }
};

export default mailSender;