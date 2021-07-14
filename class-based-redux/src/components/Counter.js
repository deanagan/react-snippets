import { connect } from "react-redux";
import classes from "./Counter.module.css";
import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.props.increment();
  }

  handleDecrement() {
    this.props.decrement();
  }

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.handleIncrement}>Increment</button>
          <button onClick={this.handleDecrement}>Decrement</button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter // equivalent to useSelector(state => state.counter)
  };
}

// useDispatch equivalent
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({type: 'increment'}),
    decrement: () => dispatch({type: 'decrement'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
