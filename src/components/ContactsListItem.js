import React from 'react';

export class ContactsListItem extends React.Component {

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
