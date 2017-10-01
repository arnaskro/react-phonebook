import React from 'react';
import * as actions from '../../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class CModalWindow extends React.Component {
  render() {
    
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <Button color="success" onClick={this.toggleNested}>Show Nested Model</Button>
          <Modal isOpen={this.props.isNestedOpen} toggle={this.toggleNested}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>All Done</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isOpen: state.contacts.modal.isOpen,
    isNestedOpen: state.contacts.modal.isNestedOpen
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(CModalWindow);
