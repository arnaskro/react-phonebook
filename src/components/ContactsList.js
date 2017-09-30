import React from 'react';
import { Table } from 'reactstrap';

export default class ContactsList extends React.Component {
  render() {

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phonenumber</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((x, i) => 
            <tr key={i} onClick={() => console.log(x.id)}> 
                <td>{x.id}</td> 
                <td>{x.name}</td> 
                <td>{x.phonenumber}</td> 
            </tr>)
            }
        </tbody>
      </Table>
    );
  }
}