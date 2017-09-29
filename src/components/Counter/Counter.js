import React from 'react';
import * as actions from '../../actions/CounterActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Input, Button, ButtonGroup } from 'reactstrap';

export class Counter extends React.Component {

  render() {
    return (
      <div>
        <Container>
        <h1 className="display-1">{this.props.value}</h1>
        <br />
        <ButtonGroup>
          <Button onClick={() => this.props.actions.add(1)} color="primary">Add</Button>
          <Button onClick={() => this.props.actions.remove(1)} color="danger">Remove</Button>
        </ButtonGroup>
        </Container>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    value: state.counter.value
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Counter);
