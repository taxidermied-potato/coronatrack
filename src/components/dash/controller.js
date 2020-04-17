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
  const [moduleType, setModuleType] = useState('stat');
  const [moduleLocation, setModuleLocation] = useState('top');
  const [dataType, setDataType] = useState(null);
  const [location, setLocation] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const totalModules = useSelector(state => state.totalModules);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://corona.lmao.ninja/countries')
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
    if (moduleType && moduleLocation && dataType && location) {
      const newModule =
      {
        id: (totalModules + 1).toString(),
        type: moduleType,
        subtype: dataType,
        country: location,
      }

      console.log(newModule)
      dispatch({ type: `ADD_MODULE`, item: newModule, location: moduleLocation })
    }
    else {
      console.log('Missing option')
    }
  }

  const data = [
    { value: 'cases', label: 'Cases' },
    { value: 'deaths', label: 'Deaths' },
    { value: 'breakdown', label: 'Case Conditions' },
  ]

  function renderLocation() {
    switch (moduleType) {
      case 'stat':
        return <FormControl component="fieldset">
          <RadioGroup aria-label="moduleLocation" name="module2" value={moduleLocation} onChange={handleLocationChange}>
            <FormControlLabel value="TOP" control={<Radio />} label="Top" />
            <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
            <FormControlLabel value="main" control={<Radio />} label="Main" />
          </RadioGroup>
        </FormControl>;
      default:
        return <FormControl component="fieldset">
          <RadioGroup aria-label="moduleLocation" name="module2" value={moduleLocation} onChange={handleLocationChange}>
            <FormControlLabel value="SIDE" control={<Radio />} label="Side" />
            <FormControlLabel value="main" control={<Radio />} label="Main" />
          </RadioGroup>
        </FormControl>;
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
          <div className="actions pop" role="button"
            onClick={() => addModule()}
            onKeyDown={() => addModule()}
            tabIndex={0}
          >
            &nbsp;Add Module
            <FaRegPlusSquare />
          </div>
        </div>
        <div className="cardBody">
          <FormControl component="fieldset">
            <RadioGroup aria-label="moduleType" name="module1" value={moduleType} onChange={handleTypeChange}>
              <FormControlLabel value="stat" control={<Radio />} label="Statistic" />
              <FormControlLabel value="table" control={<Radio />} label="Table" />
              <FormControlLabel value="graph" control={<Radio />} label="Graph" />
            </RadioGroup>
          </FormControl>
          {renderLocation()}
          <div className="selectTray">
            <Select className="select" classNamePrefix="reactSelect" placeholder="Data"
              options={data} onChange={(item) => setDataType(item.value)} />
            <Select className="select" classNamePrefix="reactSelect" placeholder="Location"
              options={countryData ?
                countryData
                :
                null
              } onChange={(item) => setLocation(item.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controller
