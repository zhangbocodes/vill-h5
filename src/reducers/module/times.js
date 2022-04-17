
function times(state = 1, action) {
  const { times, type} = action;

  switch (type) {
    case 'SET_TIMES':
      return times;
    case 'RESET_TIMES':
      return '';
    default:
      return state;
  }
}

export default times;
