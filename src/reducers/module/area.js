
function area(state = '', action) {
    const { area, type} = action;

    switch (type) {
        case 'SET_AREA':
            return area;
        case 'RESET_AREA':
            return '';
        default:
            return state;
    }
}

export default area;
