import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ContactsListItem extends React.Component {

  openModalWindow = () => {

  }

  render() {
    return (
      <tr onClick={this.props.onClick}>
          <td>{this.props.data.id + 1 }</td>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.phonenumber}</td>
      </tr>
    )
  }
}
