import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'

class Control extends Component {
render() {
  return(
    <div>

              <Search onSearch ={this.props.onSearch} /> {/*tìm kiếm*/}

              <Sort/>   {/*sắp xếp*/}

    </div>
        )
        }
  
}
export default Control;