'use strict'
import _ from 'lodash'

let request ={}
import config from './config'


request.post = function(url,body) {
  let options = _.extend(config.header,{
    body:JSON.stringify(body)

})
console.log("options:"+JSON.stringify(options));
return fetch(url,options)
.then((response) => response.json())
}

module.exports = request
