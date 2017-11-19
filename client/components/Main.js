import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import config from '../common/config'
import request from '../common/request'
import { Button ,InputGroup, Input} from 'reactstrap';

const Main = React.createClass({
getInitialState(){
  return{
    nameValue:'',
    phoneValue:'',
    addressValue:'',
  }
},
_submit(){
  var that = this;
  if(this.state.nameValue === '' ||
      this.state.phoneValue === '' ||
      this.state.addressValue === ''){
    return
  }
  that.setState({
    nameValue:'',
    phoneValue:'',
    addressValue:'',
    });
  var url = config.api.base + config.api.sendMail;
  var body = {
    name:this.state.nameValue,
    phone:this.state.phoneValue,
    address:this.state.addressValue,
  }
  request.post(url,body)
  .then((data)=>{
    if (data.success) {
      console.log('success');
    }else {
      console.log('error');
    }
  })
  .catch((err)=>{
    console.log('error');
  })
},
updateNameValue(evt){
  this.setState({
      nameValue:evt.target.value,
    });
},
updatePhoneValue(evt){
  this.setState({
      phoneValue:evt.target.value,
    });
},
updateAddressValue(evt){
  this.setState({
      addressValue:evt.target.value,
    });
},
  render() {
    var that = this;
    return (
      <div className="container">
      <div className="sendMain-container">
        <div className="sendMain-title">
          Name
        </div>
        <InputGroup>
        <input value={this.state.nameValue} onChange={evt => this.updateNameValue(evt)} placeholder="Please enter your name" />
        </InputGroup>
        <div className="sendMain-title">
          Number
        </div>
        <InputGroup>
        <input value={this.state.phoneValue} onChange={evt => this.updatePhoneValue(evt)} placeholder="Please enter your numebr" />
        </InputGroup>
        <div className="sendMain-title">
          Address
        </div>
        <InputGroup>
        <input value={this.state.addressValue} onChange={evt => this.updateAddressValue(evt)} placeholder="Please enter your addresss" />
        </InputGroup>
        <Button color="success" onClick={that._submit} className="sendMain-button">Submit</Button>
      </div>
      </div>
    )
  }
});

export default Main;
