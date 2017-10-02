import React from 'react';
import FontAwesome from 'react-fontawesome';
import { SortColumns } from '../actions/ContactsActions';
import * as actions from '../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContactsListItem } from './ContactsListItem';

import { Table } from 'reactstrap';

class ContactsList extends React.Component {

  _sort(sortColumn) {
    this.props.actions.sortByColumn(sortColumn)
  }

  _sortHelper(columnToCheck) {
    if (this.props.sorting.column === columnToCheck)
      return <FontAwesome name={this.props.sorting.asc ? 'sort-asc' : 'sort-desc'} />;
  }

  render() {

    return (

      <Table hover>
        <thead>
          <tr>
            <th onClick={() => this._sort(SortColumns.ID)}>ID {this._sortHelper(SortColumns.ID)}</th>
            <th onClick={() => this._sort(SortColumns.NAME)}>Name {this._sortHelper(SortColumns.NAME)}</th>
            <th onClick={() => this._sort(SortColumns.PHONENUMBER)}>Phonenumber {this._sortHelper(SortColumns.PHONENUMBER)}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((x, i) => <ContactsListItem onClick={() => this.props.actions.toggleModal(x.id)} data={x} key={i}/> )}
        </tbody>
      </Table>

    );
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.contacts.data,
    sorting: state.contacts.sorting,
    modal: state.contacts.modal
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(ContactsList);
