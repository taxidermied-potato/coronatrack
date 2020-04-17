import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `SWAP_THEME`) {
    return {
      ...state,
      darkMode: !state.darkMode
    }
  }
  if (action.type === `REMOVE_MODULE`) {
    if (action.location === "SIDE") {
      return {
        ...state,
        sideModules: state.sideModules.filter((module) => module.id !== action.item)
      }
    }
    else if (action.location === "TOP") {
      return {
        ...state,
        modules: state.modules.filter((module) => module.id !== action.item)
      }
    }
  }
  if (action.type === `SWAP_MODULES`) {
    if (action.location === "SIDE") {
      return {
        ...state,
        sideModules: action.item
      }
    }
    else if (action.location === "TOP") {
      return {
        ...state,
        modules: action.item
      }
    }
  }
  if (action.type === `ADD_MODULE`) {
    if (action.location === "SIDE") {
      return {
        ...state,
        sideModules: [action.item, ...state.sideModules],
        totalModules: state.totalModules + 1
      }
    }
    else if (action.location === "TOP") {
      return {
        ...state,
        modules: [action.item, ...state.modules],
        totalModules: state.totalModules + 1
      }
    }
  }

  return state
}

const initialState = {
  darkMode: true,
  modules: [
    {
      id: '1',
      type: 'stat',
      subtype: 'cases',
      country: 'USA',
    }
  ],
  sideModules: [
    {
      id: 's1',
      type: 'stat',
      subtype: 'cases',
      country: 'USA',
    }
  ],
  totalModules: 2
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore