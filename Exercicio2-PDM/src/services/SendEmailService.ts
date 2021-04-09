import SMTP_CONFIG from '../config/mail'
import nodemailer, { Transporter } from 'nodemailer'
import { SqlInMemory } from 'typeorm/driver/SqlInMemory';
import { template } from 'handlebars';
import handlebars from 'handlebars';
import fs from 'fs';
class SendEmailService {
    private client: Transporter;
    constructor() {
        const transporter = nodemailer.createTransport({
            host:SMTP_CONFIG.host,
            port:SMTP_CONFIG.port,
            auth: {
                user:SMTP_CONFIG.auth.user,
                pass:SMTP_CONFIG.auth.pass
            },
            tls: {
                rejectUnauthorized:false
            }
        });
        this.client = transporter
    }

    async execute(to:string, subject:string, variables:object, path:string){
        const templateFileContent = fs.readFileSync(path).toString('utf8');
        const mailTemplateParse = handlebars.compile(templateFileContent);
        const html = mailTemplateParse(variables)
        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: 'NPS <noreplay@ifpb.edu.br>',
        });
        console.log('Message sent: %s', message.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

    }
}

export default new SendEmailService();