import React from 'react';
import * as actions from '../../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupButton } from 'reactstrap';

class CModalWindow extends React.Component {

  render() {

    const toggle = () => this.props.actions.toggleModal();

    const toggleNested = () => this.props.actions.toggleNestedModal({'isNestedOpened' : !this.props.isNestedOpened, 'objectId' : this.props.activeId});

    const deleteContact = () => this.props.actions.remove(this.props.activeId);

    return (
      <Modal isOpen={this.props.isOpen} toggle={toggle} className={this.props.className}>
        <ModalHeader toggle={toggle}>Edit contact</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input
              ref="name"
              type="text"
              placeholder="Name"
              value={this.props.activeObject.name}
              onChange={(e) => this.props.actions.inputName(e.target.value, true)}/>
            <Input
              type="text"
              placeholder="Phonenumber"
              value={this.props.activeObject.phonenumber}
              onChange={(e) => this.props.actions.inputPhonenumber(e.target.value, true)}/>
          </InputGroup>
          <br />
          <Button color="danger" onClick={toggleNested}>Delete contact</Button>
            <Modal isOpen={this.props.isNestedOpened} toggle={toggleNested}>
              <ModalHeader>Delete contact</ModalHeader>
              <ModalBody>Are you sure?</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={deleteContact}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggleNested}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </ModalBody>
        <ModalFooter>

          <Button disabled={this.props.activeObject.name.length < 2 || this.props.activeObject.phonenumber.length < 2} color="primary"
            onClick={() => {
           this.props.actions.update(this.props.activeId, this.props.activeObject);
          }}>Save changes</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    input: state.contacts.input,
    isOpen: state.contacts.modal.isOpen,
    isNestedOpened: state.contacts.modal.isNestedOpened,
    activeId: state.contacts.modal.activeId,
    activeObject: state.contacts.modal.activeObject
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(CModalWindow);
