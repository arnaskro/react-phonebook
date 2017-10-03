import React from 'react';
import * as actions from '../../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup } from 'reactstrap';

class CModalWindow extends React.Component {

  toggle = () => this.props.actions.toggleModal()

  toggleNested =  () => this.props.actions.toggleNestedModal({'isNestedOpened' : !this.props.isNestedOpened, 'objectId' : this.props.activeId})

  deleteContact = () => this.props.actions.remove(this.props.activeId)

  renderModalBody() {
    return (
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
      <Modal isOpen={this.props.isNestedOpened} toggle={this.toggleNested}>
        <ModalHeader>Delete contact</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteContact}>Delete</Button>{' '}
          <Button color="secondary" onClick={this.toggleNested}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </ModalBody>);
  }

  renderModalFooter() {
    return (
      <ModalFooter>
        <Button color="danger" onClick={this.toggleNested} className="mr-auto">Delete contact</Button>
        <Button disabled={this.props.activeObject.name.length < 2 || this.props.activeObject.phonenumber.length < 2} color="primary"
          onClick={() => {
        this.props.actions.update(this.props.activeId, this.props.activeObject);
        }}>Save changes</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    );
  }

  render() {

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Edit contact</ModalHeader>
        {this.props.isOpen ? this.renderModalBody() : ""}
        {this.props.isOpen ? this.renderModalFooter() : ""}
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
