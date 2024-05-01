import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';

const StarWarsContext = createContext();

const INITIAL_STATE = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumber, setFilterByNumber] = useState([]);
  const [order, setOrder] = useState({});
  const [optionsColumn, setOptionsColumn] = useState(INITIAL_STATE);
  const [optionsOrder] = useState(INITIAL_STATE);

  useEffect(() => {
    const getPlanets = async () => {
      const dataAPI = await planetsAPI();
      const newData = [...dataAPI];
      setData(newData);
    };
    getPlanets();
  }, []);

  const changeFilterByName = (name) => {
    setFilterByName({ name });
  };

  const changeOptionsColumn = (column, arg) => {
    if (arg === 'remove') {
      setOptionsColumn(optionsColumn.filter((option) => option !== column));
    } else {
      setOptionsColumn([...optionsColumn, column]);
    }
  };

  const changeFilterByNumber = (column, comparison, value) => {
    setFilterByNumber([...filterByNumber, {
      column, comparison, value }]);
    changeOptionsColumn(column, 'remove');
  };

  const removeFilter = (filtro) => {
    setFilterByNumber(filterByNumber.filter(({ column }) => column !== filtro));
    changeOptionsColumn(filtro, 'add');
  };

  const removeAllNumberFilters = () => {
    setFilterByNumber([]);
    setOptionsColumn(INITIAL_STATE);
  };

  const changeOrder = (column, sort) => {
    setOrder({ column, sort });
  };

  const context = {
    data,
    filterByName,
    filterByNumber,
    changeFilterByName,
    changeFilterByNumber,
    removeFilter,
    removeAllNumberFilters,
    optionsColumn,
    changeOptionsColumn,
    order,
    optionsOrder,
    changeOrder,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StarWarsContext, Provider };
