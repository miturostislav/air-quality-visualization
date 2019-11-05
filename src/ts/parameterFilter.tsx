import * as React from 'react';
import { Parameter } from './types';

interface ParameterFilterProps {
  selectedParameters: Parameter[];
  setSelectedParameters: (parameters: Parameter[]) => void
}

function ParameterFilter({ selectedParameters, setSelectedParameters }: ParameterFilterProps) {

  function setParameter(parameter: Parameter) {
    setSelectedParameters([...selectedParameters, parameter]);
  }

  function removeParameter(parameter: Parameter) {
    setSelectedParameters(selectedParameters.filter((currentParameter) => currentParameter !== parameter));
  }

  return (
    <div className="filter">
      <p className="filter__title">
        Parameters
      </p>
      <ul>
        {
          Object.values(Parameter).map((parameter) => {
            const isSelected = selectedParameters.indexOf(parameter) !== -1;
            return (
              <li key={parameter} className="filter__parameter">
                <label className="filter__parameter-label" htmlFor={`${parameter}-id`}>
                  <input
                    id={`${parameter}-id`}
                    type="checkbox"
                    className="filter__parameter-input"
                    onChange={(e): void => e.currentTarget.checked ? setParameter(parameter) : removeParameter(parameter)}
                    checked={isSelected}
                  />
                  <span className={`filter__parameter-tick ${isSelected ? 'filter__parameter-tick--active': ''}`} />
                  <span className="filter__parameter-label-text">{parameter}</span>
                </label>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ParameterFilter;