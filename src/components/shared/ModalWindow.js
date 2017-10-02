import React from 'react';
import * as actions from '../../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CModalWindow extends React.Component {
  
  toggle() {
    this.props.actions.toggleModal(!this.props.isOpen);
  }
  
  render() {
    
    const toggle = () => this.toggle();

    return (
      <Modal isOpen={this.props.isOpen} toggle={toggle} className={this.props.className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br />
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.contacts.modal.isOpen
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(CModalWindow);
