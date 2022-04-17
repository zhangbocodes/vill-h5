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

export function setTimes(times) {
  return {
    type: 'SET_TIMES',
    times,
  };
}

export function resetTimes() {
  return {
    type: 'RESET_TIMES'
  };
}
