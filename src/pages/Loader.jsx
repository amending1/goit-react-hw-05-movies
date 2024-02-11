import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';


const Loader = () => (
  <div>
    <ThreeCircles type="ThreeDots" color="#3e6040" height={70} width={70} />
  </div>
);

export default Loader;