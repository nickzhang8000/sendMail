import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import store from '../store'

function mapStateToProps(state){
  console.log(store.getState());
  return {
    data:state.data
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
