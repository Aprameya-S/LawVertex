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
<svg width="39" height="37" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.597 18.5786L20.4768 36.5997C20.3492 36.7266 20.1978 36.8273 20.0311 36.896C19.8645 36.9646 19.6859 37 19.5055 37C19.3251 37 19.1465 36.9646 18.9798 36.896C18.8132 36.8273 18.6618 36.7266 18.5342 36.5997L0.413925 18.5786C0.222067 18.3875 0.0914368 18.1441 0.038535 17.8792C-0.0143668 17.6142 0.0128358 17.3397 0.1167 17.0901C0.220564 16.8406 0.396435 16.6272 0.622099 16.477C0.847763 16.3269 1.1131 16.2466 1.38459 16.2464L37.6251 16.2464C37.8967 16.2464 38.1622 16.3265 38.3881 16.4766C38.6139 16.6266 38.79 16.84 38.894 17.0896C38.998 17.3392 39.0254 17.6138 38.9725 17.8789C38.9196 18.1439 38.789 18.3874 38.597 18.5786Z" fill="#0846A1"/>
<path d="M38.597 10.4536L20.4767 28.4796C20.2246 28.7324 19.8826 28.8764 19.5247 28.8805L12.7908 8.1189L37.6251 8.1189C37.8969 8.11898 38.1627 8.19924 38.3887 8.34954C38.6147 8.49984 38.7908 8.71343 38.8948 8.9633C38.9988 9.21316 39.0261 9.48809 38.9731 9.75335C38.92 10.0186 38.7892 10.2623 38.597 10.4536Z" fill="url(#paint0_linear_30_191)"/>
<path d="M38.597 10.4536L30.5081 18.5009L12.7908 8.1189L37.6251 8.1189C37.8969 8.11898 38.1627 8.19924 38.3887 8.34954C38.6147 8.49984 38.7908 8.71343 38.8948 8.9633C38.9988 9.21316 39.0261 9.48809 38.9731 9.75335C38.92 10.0186 38.7892 10.2623 38.597 10.4536Z" fill="url(#paint1_linear_30_191)"/>
<path d="M19.5259 28.8805C19.3419 28.8837 19.1593 28.8498 18.9888 28.7809C18.8184 28.712 18.6637 28.6095 18.5341 28.4796L0.413863 10.4536C0.315851 10.358 0.232331 10.2487 0.165928 10.1292C0.0883813 9.98713 0.0379458 9.83199 0.0171691 9.67165C-0.00898966 9.47821 0.00673273 9.28145 0.0632813 9.09455C0.11983 8.90765 0.215895 8.73492 0.345038 8.58798C0.474181 8.44105 0.633416 8.32327 0.812057 8.24258C0.990698 8.16189 1.18461 8.12016 1.38081 8.12015L12.7858 8.12015L19.5259 28.8805Z" fill="url(#paint2_linear_30_191)"/>
<path d="M8.68378 18.6847L0.408982 10.4536C0.310969 10.358 0.22745 10.2487 0.161047 10.1292C0.0834996 9.98716 0.0330641 9.83202 0.0122874 9.67168C-0.0138714 9.47824 0.00184629 9.28148 0.0583949 9.09458C0.114943 8.90768 0.211014 8.73495 0.340156 8.58801C0.469299 8.44108 0.628529 8.3233 0.80717 8.24261C0.985811 8.16192 1.17973 8.12019 1.37592 8.12018L12.7809 8.12018L8.68378 18.6847Z" fill="url(#paint3_linear_30_191)"/>
<path d="M38.597 2.33342L20.4768 20.3595C20.3492 20.4864 20.1978 20.5871 20.0312 20.6558C19.8645 20.7244 19.6859 20.7597 19.5055 20.7597C19.3251 20.7597 19.1465 20.7244 18.9798 20.6558C18.8132 20.5871 18.6618 20.4864 18.5342 20.3595L0.413942 2.33342C0.221659 2.14238 0.0906577 1.89889 0.0375114 1.63376C-0.015635 1.36862 0.0114637 1.09377 0.115379 0.843969C0.219293 0.594162 0.395354 0.38063 0.621284 0.2304C0.847213 0.0801694 1.11286 -1.20057e-05 1.38461 6.15581e-07L37.6251 5.93051e-07C37.897 -0.000256251 38.1628 0.0797551 38.3889 0.229891C38.6151 0.380028 38.7913 0.593528 38.8954 0.843385C38.9994 1.09324 39.0266 1.36821 38.9735 1.63346C38.9204 1.8987 38.7894 2.14231 38.597 2.33342Z" fill="url(#paint4_linear_30_191)"/>
<defs>
<linearGradient id="paint0_linear_30_191" x1="12.7908" y1="18.4997" x2="38.9994" y2="18.4997" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#BAD3F8"/>
</linearGradient>
<linearGradient id="paint1_linear_30_191" x1="23.3791" y1="20.38" x2="24.2564" y2="-5.26783" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#BAD3F8"/>
</linearGradient>
<linearGradient id="paint2_linear_30_191" x1="20.4434" y1="18.5004" x2="-1.14686" y2="18.5004" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#BAD3F8"/>
</linearGradient>
<linearGradient id="paint3_linear_30_191" x1="12.9215" y1="14.4166" x2="1.30738" y2="6.56273" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#BAD3F8"/>
</linearGradient>
<linearGradient id="paint4_linear_30_191" x1="19.5055" y1="18.6838" x2="19.5055" y2="-0.207597" gradientUnits="userSpaceOnUse">
<stop stop-color="#479FF7"/>
<stop offset="1" stop-color="#1161FB"/>
</linearGradient>
</defs>
</svg>

  <br/>
  <br/><br/>
  You have received file <b>${fileName}</b> from <b>${senderName}</b> <i>[${senderWalletAddress}]</i> to your lawvertex account linked to wallet <b>${receiverWalletAddress}</b>.

  <br/>
  <br/>

  <p style="text-align:center; font-size:24px;letter-spacing:10px;">${password}</p>

  <br/>
  

Please note that only the above password can open the file. Losing this will result in an encrypted file. Please store it securely and do not share with anyone.

<br/><br/>

File can be viewed at <a href={'lawvertex.vercel.app/vault/receivedFiles/${publicid}'}>{'lawvertex.vercel.app/vault/receivedFiles/${publicid}'}</a>
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