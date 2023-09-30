import React, { Component } from 'react';
import SpinnerImage from './Spinner.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={SpinnerImage} alt="spinner" />
      </div>
    );
  }
}

export default Spinner;
