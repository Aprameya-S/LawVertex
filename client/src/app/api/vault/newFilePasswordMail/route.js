import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { fileName, senderName, senderWalletAddress, receiverWalletAddress, password, publicid, mailTo  } = await request.json();

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
            subject: "New file received",
            html: `
        
<div style="max-width: 600px; margin-inline:auto;font-family: Arial, sans-serif; padding-inline:20px;padding-top:50px;">
<img src="https://transferchain.io/icons/favicon-32x32.png"/>

  <br/><br/>
  You have received file <b>${fileName}</b> from <b>${senderName}</b> <i>[${senderWalletAddress}]</i> to your Lawvertex Vault linked to wallet <b>${receiverWalletAddress}</b>.

  <br/>
  <br/>

  <p style="text-align:center; font-size:24px;letter-spacing:10px;">${password}</p>

  <br/>
  

Please note that only the above password can open the file. Losing this will result in an encrypted file. Please store it securely and do not share with anyone.

<br/><br/>

File can be viewed <a href={'lawvertex.vercel.app/vault/receivedFiles/${publicid}'}>here</a>.
<br/><br/><br/><br/>
<p style="font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.24px;
  line-height: 18px;
  text-align: center;
  color: #646d7a;">Copyright © Lawvertex</p>
</div>
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}