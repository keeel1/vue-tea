/* mail.js文件，发送邮件模块*/
const nodemailer = require('nodemailer');

/* mail.js文件，发送邮件模块*/
//配置邮箱
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  secureConnection: true, // use SSL
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: "1031558863@qq.com",   //其他的不要动，更改邮箱
    pass: "kweklcpglkavbbjb",    // QQ邮箱需要使用的授权码
  },
});

//参数：mail：需要发送的邮件地址；code：验证码
function sendMail(mail, code) {

  // 设置邮件内容（谁发送什么给谁）
  let mailOptions = {
    from: '"朱凯洁" <1031558863@qq.com>',   // 发件人
    to: mail,     // 收件人
    subject: "邮箱验证",    // 主题
    // text: `您正在尝试修改密码,您的验证码是 ${code},有效期5分钟。`,   // 直接发送文本
    html: `
    <!DOCTYPE html>
    <html xmlns:th="http://www.thymeleaf.org">
    
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="description" content="email code">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <!--邮箱验证码模板-->
    
    <body>
      <div style="background-color:#ECECEC; padding: 35px;">
        <table cellpadding="0" align="center"
          style="width: 800px;height: 100%; margin: 0px auto; text-align: left; position: relative; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; font-size: 14px; font-family:微软雅黑, 黑体; line-height: 1.5; box-shadow: rgb(153, 153, 153) 0px 0px 5px; border-collapse: collapse; background-position: initial initial; background-repeat: initial initial;background:#fff;">
          <tbody>
            <tr>
              <th valign="middle"
                style="height: 25px; line-height: 25px; padding: 15px 35px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: RGB(16, 76, 31); background-color: RGB(16, 76, 31); border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;">
                <font face="微软雅黑" size="5" "></font>
              </th>
            </tr>
            <tr>
              <td style="word-break:break-all">
                <div style="padding:25px 35px 40px; background-color:#fff;opacity:0.8;">
    
                  <h2 style="margin: 5px 0px; ">
                    <font color="#333333" style="line-height: 20px; ">
                      <font style="line-height: 22px; " size="4">
                        尊敬的用户：</font>
                    </font>
                  </h2>
                  <!-- 中文 -->
                  <p>您好！感谢您使用<b style="color: #104c1f;">茶叶网</b>，您的账号正在进行邮箱验证，验证码为：<font color="#ff8c00" style="font-size: 20px;">${code}</font>，有效期5分钟，请尽快填写验证码完成验证！</p><br>
                  <!-- 英文 -->
                  <h2 style="margin: 5px 0px; ">
                    <font color="#333333" style="line-height: 20px; ">
                      <font style="line-height: 22px; " size="4">
                        Dear user:</font>
                    </font>
                  </h2>
                  <p>Hello! Thanks for using <b style="color: #104c1f;">TeaNet</b>, your account is being authenticated by email, the
                    verification code is:<font color="#ff8c00" style="font-size: 20px;">${code}</font>, valid for 5 minutes. Please fill in the
                    verification code as soon as
                    possible!</p>
                  <div style="width:100%;margin:0 auto;">
                    <div
                      style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                      <br>
                      <p>此为系统邮件，请勿回复<br>
                        Please do not reply to this system email
                      </p>
                      <p>©朱凯洁 190701030218</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    
    </html>
    `,       // 也可以发送html格式文本
  };

  //这里返回一个异步操作
  return new Promise((resolve, reject) => {
    // 使用先前创建的传输器的 sendMail 方法传递消息对象
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject();
      else {
        console.log(`Message: ${info.messageId}`);
        console.log(`sent: ${info.response}`);
        resolve();
      }
    });
  });
}

module.exports = { sendMail };  //最后暴露一个sendMail方法，之后会进行这个方法的封装
