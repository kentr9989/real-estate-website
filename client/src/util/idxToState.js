export const arrState = [
    'NSW',
    'VIC',
    'WA',
    'SA',
    'TAS',
]

export const stateToIdx = (state) => {
    return arrState.findIndex((st) => st.toLowerCase() === state.toLowerCase())
}

export const idxToState = (idx) => {
    return (arrState.filter((_, index) => index === Number(idx)))[0]
}