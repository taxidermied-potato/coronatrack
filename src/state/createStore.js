import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `SWAP_THEME`) {
    return {
      ...state,
      darkMode: !state.darkMode
    }
  }
  if (action.type === `SET_THEME`) {
    if (action.urlParam === 'light') {
      return {
        ...state,
        darkMode: false
      }
    }
    else if (action.urlParam === 'dark') {
      return {
        ...state,
        darkMode: true
      }
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
      country: ['USA'],
    },
    {
      id: '2',
      type: 'stat',
      subtype: 'deaths',
      country: ['USA'],
    },
    {
      id: '3',
      type: 'stat',
      subtype: 'cases',
      country: ['China'],
    },
    {
      id: '4',
      type: 'stat',
      subtype: 'cases',
      country: ['UK'],
    }
  ],
  sideModules: [
    {
      id: "5",
      type: "table",
      subtype: (countries) => countries.filter(el => el.cases > 10000),
      country: ['All'],
    },
    {
      id: '6',
      type: 'stat',
      subtype: 'cases',
      country: ['All'],
    },
    {
      id: '7',
      type: 'stat',
      subtype: 'deaths',
      country: ['All'],
    }
  ],
  totalModules: 7
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore