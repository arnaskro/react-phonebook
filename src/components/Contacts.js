import React from 'react';
import * as actions from '../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Input, InputGroup, InputGroupButton, Button } from 'reactstrap';


import ContactsList from './ContactsList';

class Contacts extends React.Component {

  render() {

    return (
      <div>
        <br />
        <Row>
          <Col xs="12">
            <InputGroup>
              <Input 
                ref="name" 
                type="text" 
                placeholder="Name" 
                value={this.props.input.name}
                onChange={(e) => this.props.actions.inputName(e.target.value)}/>
              <Input 
                type="text"
                placeholder="Phonenumber"
                value={this.props.input.phonenumber}
                onChange={(e) => this.props.actions.inputPhonenumber(e.target.value)}/>
              <InputGroupButton>
                <Button 
                  disabled={this.props.input.name.length < 2 || this.props.input.phonenumber.length < 2} 
                  color="success" 
                  onClick={() => {
                   this.props.actions.add(this.props.data.length, this.props.input.name, this.props.input.phonenumber);    
                  }}>Add</Button>
              </InputGroupButton>
            </InputGroup>
          </Col>
          <Col xs="12">
            <ContactsList />
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
    data: state.contacts.data,
    input: state.contacts.input
	};
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Contacts);