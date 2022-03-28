export * from './module/auth';

export function setArea(area) {
    return {
        type: 'SET_AREA',
        area,
    };
}

export function resetArea() {
    return {
        type: 'RESET_AREA'
    };
}
