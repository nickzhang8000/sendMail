'user strict'

module.exports = {
  header:{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    }
  },

  api:{
    base:'http://localhost:7771/',
    sendMail:'sendMail',
  },
}
