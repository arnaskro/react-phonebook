import React from 'react';
import * as actions from '../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CModalWindow from './shared/ModalWindow';
import {ListTypes} from '../actions/ContactsActions';

import { Row, Col, Input, InputGroup, InputGroupButton, Button, ButtonGroup } from 'reactstrap';


import ContactsList from './ContactsList';

class Contacts extends React.Component {

    _onChange = (e) => {

      if (e.target.value) {
        this.props.actions.inputSearchParam(e.target.value)
        this.props.actions.filterSearchResult(e.target.value);
      } else {
        this.props.actions.inputSearchParam('');
        this.props.actions.filterSearchResult('');
      }};

    _totalContacts = () => {
      const mappedFavorites = this.props.favorites.map(y => y.contactId);

      let sum = this.props.searched ? //Is the data regular or searched
      (this.props.activeList === "ALL" // Is the view showing all data or just favorites
        ? this.props.searchedData.reduce((sum, value) => { return sum + 1; }, 0) // All searched data
          : this.props.searchedData.filter(x => mappedFavorites.includes(x.id)).reduce((sum, value) => { return sum+1; }, 0) + " favourite") // Favorites searched data
            : (this.props.activeList === "ALL" // Is the view showing all data or just favorites
              ? this.props.data.length // All searched data
                : this.props.favorites.reduce((sum, value) => { return sum + 1; }, 0) + " favourite") // Favorites data

      return sum;
    };

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
                onChange={(e) => this.props.actions.inputPhonenumber(e.target.value)} />
              <InputGroupButton>
                <Button
                  disabled={this.props.input.name.length < 2 || this.props.input.phonenumber.length < 2 || !new RegExp(/^\d+$/).test(this.props.input.phonenumber)}
                  color="success"
                  onClick={() => {
                   this.props.actions.add(this.props.data.length ? this.props.data[this.props.data.length-1].id+1 : 0, this.props.input.name, this.props.input.phonenumber);
                  }}>Add</Button>
              </InputGroupButton>
            </InputGroup>

            <br />

            <InputGroup>
              <Input
                ref="searchParam"
                type="text"
                placeholder="Search"
                value={this.props.searchParam}
                onChange={(e) => this._onChange(e)}/>
            </InputGroup>
          </Col>
          <Col xs="12">
            <ContactsList />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <p className="text-muted"> You have <b>{this._totalContacts()}</b> contact(s).</p>
          </Col>
          <Col xs="12" md="6">
            <ButtonGroup size="sm" className="float-right">
              <Button onClick={() => this.props.actions.toggleListType(ListTypes.ALL)} color={this.props.activeList === ListTypes.ALL ? "dark" : "light" }>All</Button>
              <Button onClick={() => this.props.actions.toggleListType(ListTypes.FAVORITES)} color={this.props.activeList === ListTypes.FAVORITES ? "dark" : "light" }>Favorites</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <CModalWindow />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
    data: state.contacts.data,
    favorites: state.contacts.favorites,
    input: state.contacts.input,
    activeList: state.contacts.activeList,
    searchParam: state.contacts.searchParam,
    searchedData: state.contacts.searchedData,
    searched: state.contacts.searched
	};
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Contacts);
