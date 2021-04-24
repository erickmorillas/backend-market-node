import nodemailer from "nodemailer"

export const sendmail = async (email: string, message: string) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "aican.oficial@gmail.com",
            pass: "Aican123.",
        },
    });

    const mailOptions = {
        from: "Haciendola <aican.oficial@gmail.com>",
        to: email,
        subject: "Recuperar contraseña",
        html: message,
        text: message,
    };

    return transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return { message: "error" + err.message };
        }

        return { message: "email sent" };
    });

}