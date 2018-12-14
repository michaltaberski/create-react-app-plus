import produce from 'immer';
import { actionDispatcher } from './action$';

const id = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

export const initState = {
  text: '',
  counters: [
    { id: id(), count: 0 },
    { id: id(), count: 2 },
    { id: id(), count: 6 }
  ]
};

const inc = (state, action) =>
  produce(state, draft => {
    draft.counters.find(counter => counter.id === action.payload.id).count += 1;
  });

const dec = (state, action) => {
  return produce(state, draft => {
    draft.counters.find(counter => counter.id === action.payload.id).count -= 1;
  });
};

const del = (state, action) =>
  produce(state, draft => {
    const index = draft.counters.findIndex(
      counter => counter.id === action.payload.id
    );
    draft.counters.splice(index, 1);
  });

const add = (state, action) =>
  produce(state, draft => {
    draft.counters.push({ id: id(), count: 0 });
  });

const setText = (state, action) =>
  produce(state, draft => {
    draft.text = action.payload;
  });

const clearText = (state, action) =>
  produce(state, draft => {
    draft.text = '';
  });

// Redux reducer
const reducer = (state, action) => {
  const map = new Map([
    ['INC', inc],
    ['DEC', dec],
    ['DEL', del],
    ['ADD', add],
    ['SET_TEXT', setText],
    ['CLEAR_TEXT', clearText]
  ]);
  return map.has(action.type) ? map.get(action.type)(state, action) : state;
};

export const actions = {
  inc: actionDispatcher(id => ({ type: 'INC', payload: { id } })),
  dec: actionDispatcher(id => ({ type: 'DEC', payload: { id } })),
  del: actionDispatcher(id => ({ type: 'DEL', payload: { id } })),
  add: actionDispatcher(id => ({ type: 'ADD' })),
  setText: actionDispatcher(text => ({ type: 'SET_TEXT', payload: text }))
};

export default reducer;
