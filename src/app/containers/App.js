import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import reduxConnectProps from '../utils/redux-connect-props';
import initialiseWeb3 from '../utils/web3Setup';

import NavBar from '../components/NavBar';
import Routes from '../components/Routes';
import ModalContainer from '../components/Modal/ModalContainer';

import { closeModal } from '../actions/modalActions';

@connect(store => ({
  core: store.core,
  modal: store.modal
}))
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPage: this.props.location.pathname.replace('/', '')
    };
  }

  componentWillMount() {
    initialiseWeb3(this.props.dispatch);
  }

  handleNavSelection(newPage) {
    this.setState({ selectedPage: newPage });
  }

  handleCloseModal() {
    this.props.dispatch(closeModal());
  }

  render() {
    const { modal } = this.props;

    return (
      <div className="view-container">
        <NavBar
          signedIn={this.props.core.userIsSignedIn}
          selectedItem={this.state.selectedPage}
          handleNavSelection={(newPage) => this.handleNavSelection(newPage)}
          />
        {modal.showModal && <ModalContainer contents={modal.contents} handleCloseModal={() => this.handleCloseModal()} />}
        <ToastContainer />
        <Routes />
      </div>
    );
  }
}

export default withRouter(reduxConnectProps(App));
