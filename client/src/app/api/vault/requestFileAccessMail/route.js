import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { fileName, fromAddress, fromName, mailTo } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'arthurdayne556@gmail.com',
                pass: "vlmo nvtb znba hxjb "
            }
        })

        const mailOption = {
            from: 'arthurdayne556@gmail.com',
            to: mailTo,
            subject: "File Access Requested",
            html: `
        
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              <div style="max-width: 600px; margin-inline:auto;font-family: Arial, sans-serif; padding-inline:20px;padding-top:50px;">
                <img src="https://transferchain.io/icons/favicon-32x32.png"/>
    
                <br/><br/>
                <b>${fromName}</b> <i>[${fromAddress}]</i> has requested file <b>${fileName}</b> on Lawvertex Vault.
              
                <br/>
                <br/>
              
                You can grant access <a href='lawvertex.vercel.app/vault/manageAccess'>here</a>.
              <br/><br/><br/><br/>
              
              <p style="font-size: 12px;
                font-weight: 400;
                letter-spacing: 0.24px;
                line-height: 18px;
                text-align: center;
                color: #646d7a;">Copyright © Lawvertex</p>
              </div>
            </body>
            </html>
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}