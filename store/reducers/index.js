const initialRootState = {
  rowData: null,
  tickDuration: 20,
  tickWorkDuration: 0,
  ticking: false,
  updateConfig: { running: true, percentChanging: 15 },
}

export const rootReducer = (state = initialRootState, action) => {
  switch (action.type) {
    case 'REFRESH': {
      return { ...state, rowData: [...state.rowData] }
    }
    case 'SET_PERCENTCHANGING': {
      return {
        ...state,
        updateConfig: {
          ...state.updateConfig,
          percentChanging: action.payload,
        },
      }
    }
    case 'SET_ROWDATA': {
      return { ...state, rowData: action.payload }
    }
    case 'SET_TICKING': {
      return { ...state, ticking: action.payload }
    }
    case 'SET_TICKWORKDURATION': {
      return { ...state, tickWorkDuration: action.payload }
    }
    case 'SET_UPDATECONFIG': {
      return { ...state, updateConfig: action.payload }
    }
    default: {
      return state
    }
  }
}
