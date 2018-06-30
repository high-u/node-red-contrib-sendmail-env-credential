module.exports = function(RED) {
  function SendmailEnvCredential(config) {
    var nodemailer = require("nodemailer");

    RED.nodes.createNode(this, config);

    var node = this;

    node.transporter = nodemailer.createTransport({
      host: process.env[config.host],
      port: process.env[config.port],
      auth: {
        user: process.env[config.user],
        pass: process.env[config.pass]
      }
    });

    node.on("input", function(msg) {
  
      var mailOptions = {
        from: msg.from,
        to: msg.to,
        subject: msg.subject,
        text: msg.body
      };

      node.transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
        }else{
          console.log(info.message);
        }
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("sendmail-env-credential", SendmailEnvCredential);
}  