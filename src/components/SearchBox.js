import React from 'react'

const SearchBox = (props) => {
  return (
      <div className='col col-sm-4'>
          <input className='form-control' value={props.searchValue} onChange={(event) => {
              props.setSearchValue(event.target.value);
              console.log(props.searchValue);
             
          }} placeholder='Type to Search...'></input>
    </div>
  )
}

export default SearchBox