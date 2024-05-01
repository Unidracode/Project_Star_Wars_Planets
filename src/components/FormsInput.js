import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FormsInput() {
  const {
    filterByName,
    filterByNumber,
    changeFilterByName,
    changeFilterByNumber,
    removeFilter,
    removeAllNumberFilters,
    optionsColumn,
  } = useContext(StarWarsContext);
  const [category, setCategory] = useState('population');
  const [operant, setOperant] = useState('maior que');
  const [number, setNumber] = useState(0);

  const generateSelect = (array) => array.map((option) => (
    <option
      data-testid="column-option"
      value={ option }
      key={ Math.random() }
    >
      { option }
    </option>
  ));

  const handleClick = (categoryFilter, operantFilter, numberFilter) => {
    changeFilterByNumber(categoryFilter, operantFilter, numberFilter);
    setCategory(optionsColumn[1]);
  };

  const handleClickRemove = (column) => {
    removeFilter(column);
  };

  return (
    <header>
      { filterByNumber && filterByNumber.map(({ column, comparison, value }) => (
        <div data-testid="filter" key={ Math.random() }>
          <div>{`${column} ${comparison} ${value}`}</div>
          <button
            type="button"
            onClick={ () => handleClickRemove(column) }
          >
            X
          </button>
        </div>
      ))}
      <forms>
        <input
          type="text"
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ (ev) => changeFilterByName(ev.target.value) }
        />
      </forms>
      <form>
        <br />
        <label htmlFor="coluna">
          Coluna:
          <select
            data-testid="column-filter"
            value={ category }
            onChange={ (ev) => setCategory(ev.target.value) }
          >
            { generateSelect(optionsColumn)}
          </select>
        </label>
        { ' ' }
        <label htmlFor="operador">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ operant }
            onChange={ (ev) => setOperant(ev.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        { ' ' }
        <input
          value={ number }
          type="number"
          data-testid="value-filter"
          onChange={ (ev) => setNumber(ev.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          disabled={ !(optionsColumn.length) }
          onClick={ () => handleClick(category, operant, number) }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => removeAllNumberFilters() }
        >
          Remover Filtragens
        </button>
      </form>
    </header>
  );
}

export default FormsInput;
