import React, { useState, useEffect } from 'react'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import Select from 'react-select'
import { FaPuzzlePiece, FaRegPlusSquare } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";

function Controller() {
  const [moduleType, setModuleType] = useState(null);
  const [moduleLocation, setModuleLocation] = useState('SIDE');
  const [dataType, setDataType] = useState(null);
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [countryData, setCountryData] = useState(null);

  const totalModules = useSelector(state => state.totalModules);
  const dispatch = useDispatch();

  const data = [
    { value: 'cases', label: 'Cases' },
    { value: 'deaths', label: 'Deaths' },
    { value: 'breakdown', label: 'Case Conditions' },
    { value: 'tests', label: 'Testing' }
  ]

  useEffect(() => {
    fetch('https://corona.lmao.ninja/v2/countries')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(d =>
          ({
            value: d.country,
            label: d.country
          })
        )

        mapped.unshift({
          value: 'All',
          label: 'All'
        })

        setCountryData(mapped)
      })
      .catch(console.log)
  }, [])

  const handleTypeChange = event => {
    setModuleType(event.target.value);
  };

  const handleLocationChange = event => {
    setModuleLocation(event.target.value);
  };

  const addModule = () => {
    if (moduleType && moduleLocation) {
      switch (moduleType) {
        case 'stat': 
          if (dataType && location) {
            const newModule =
            {
              id: (totalModules + 1).toString(),
              type: moduleType,
              subtype: dataType.value,
              country: [location.value],
              data: null
            }

            console.log(newModule)
            dispatch({ type: `ADD_MODULE`, item: newModule, location: moduleLocation })
          }
          else {
            console.log('Can\'t create module, missing option')
          }
          break
        case 'table':
          if (locations.length > 0) {
            const newModule =
            {
              id: (totalModules + 1).toString(),
              type: moduleType,
              subtype: null,
              country: locations.map(el => el.value),
              data: null
            }

            console.log(newModule)
            dispatch({ type: `ADD_MODULE`, item: newModule, location: moduleLocation })
          }
          else {
            console.log('Can\'t create module, missing option')
          }
          break
        default:
          break
      }
    }
    else {
      console.log('Can\'t create module, missing type/location')
    }
  }

  function renderLocation() {
    switch (moduleType) {
      case 'stat':
        return <>
          <FormControlLabel value="TOP" control={<Radio />} label="Top" />
          <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
          <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
        </>
      case 'table':
        return <>
          <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
          <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
        </>
      case 'graph':
        return <>
          <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
          <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
        </>
      default:
        return <>
          <FormControlLabel value="TOP" control={<Radio />} label="Top" />
          <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
          <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
        </>
    }
  }

  function renderOptions() {
    switch (moduleType) {
      case 'stat':
        return <>
          <Select className="select" classNamePrefix="reactSelect" placeholder="Data"
            options={data} value={dataType} onChange={(item) => setDataType(item)} />
          <Select className="select" classNamePrefix="reactSelect" placeholder="Location"
            options={countryData ? countryData : null} value={location} onChange={(item) => setLocation(item)} />
        </>
      case 'table':
        return <>
          <Select className="select" classNamePrefix="reactSelect" placeholder="Locations" isMulti
            options={countryData ? countryData : null} value={locations} onChange={(item) => setLocations(item)} />
        </>
      // <div className="card">
      //   <div className="cardBody">
      //     <p>
      //       Options WIP. Please customize table after module creation.
      //     </p>
      //   </div>
      // </div>
      case 'graph':
        return <div className="card">
          <div className="cardBody">
            <p>
              Options WIP. Please customize graph after module creation.
            </p>
          </div>
        </div>
      default:
        return <div className="card">
          <div className="cardBody">
            <p>
              Use this manager to add a module to the dashboard.
            </p>
          </div>
        </div>
    }
  }

  return (
    <div className="controller">
      <div className="card">
        <div className="cardHeader">
          <FaPuzzlePiece />
          <div className="title">
            <p> Module Manager </p>
          </div>
          <button className="actions pop"
            onClick={() => addModule()}
          >
            Add Module
            <FaRegPlusSquare />
          </button>
        </div>
        <div className="cardBody">
          <FormControl component="fieldset">
            <RadioGroup aria-label="moduleType" name="module1" value={moduleType} onChange={handleTypeChange}>
              <FormControlLabel value="stat" control={<Radio />} label="Statistic" />
              <FormControlLabel value="table" control={<Radio />} label="Table" />
              <FormControlLabel value="graph" control={<Radio />} label="Graph" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className="locationPicker">
            <RadioGroup aria-label="moduleLocation" name="module" value={moduleLocation} onChange={handleLocationChange}>
              {renderLocation()}
            </RadioGroup>
          </FormControl>
          <div className="selectTray">
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controller
