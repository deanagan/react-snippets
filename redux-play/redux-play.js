const redux = require('redux');

// Must return new state object
// Must be a pure function/no side effect (no http request/writing to localStorage)
const countReducer =  (oldState = {count: 0}, action) => {
    if (action.type === 'increment') {
        return {
            count: oldState.count + 1
        };
    }

    if (action.type === 'decrement') {
        return {
            count: oldState.count - 1
        }
    }
    return oldState;
};

const store = redux.createStore(countReducer);

const counterSubscriber = () => {
    const newState = store.getState();
    console.log(newState);
};

store.subscribe(counterSubscriber);


// Action
store.dispatch({ type: 'increment'});
store.dispatch({ type: 'increment'});

store.dispatch({ type: 'decrement'});