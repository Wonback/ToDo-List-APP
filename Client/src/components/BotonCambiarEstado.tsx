import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
}




const BotonCambiarEstado = ({ id, checked, onChange }: CheckboxProps) => {
    
  return (
    
    <StyledWrapper>
      
        <input
        type="checkbox"
        id={id}
        className='_checkbox'
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <div id="tick_mark" />
      </label>
      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    position: relative;

  ._checkbox {
   display: none;
  }

 label {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #f72414;
  /* transform: translateY(-50%); 👈 SACALO */
  vertical-align: middle; /* 👈 AGREGA ESTO */
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease transform, 0.2s ease background-color, 0.2s ease box-shadow;
  overflow: hidden;
  z-index: 1;
}

  label:before {
   content: "";
   position: absolute;
   top: 50%;
   right: 0;
   left: 0;
   width: 24px;
   height: 23px;
   margin: 0 auto;
   background-color: #fff;
   transform: translateY(-50%);
   border-radius: 50%;
   box-shadow: inset 0 7px 10px #ffbeb8;
   transition: 0.2s ease width, 0.2s ease height;
  }

  label:hover:before {
   transform: translateY(-50%) scale(1.1);
   box-shadow: inset 0 7px 10px #ff9d96;
  }

  label:active {
   transform: translateY(-50%) scale(0.9);
  }

  #tick_mark {
   position: absolute;
   top: 0px;
   right: 0;
   left: 0;
   width: 15px;
   height: 18px;
   margin: 0 auto;
   margin-left: 5px;
   transform: rotateZ(-40deg);
  }

  #tick_mark:before, #tick_mark:after {
   content: "";
   position: absolute;
   background-color: #fff;
   border-radius: 2px;
   opacity: 0;
   transition: 0.2s ease transform, 0.2s ease opacity;
  }

  #tick_mark:before {
   left: 0;
   bottom: 0;
   width: 4px;
   height: 10px;
   box-shadow: -2px 0 5px rgba(0,0,0,0.23);
   transform: translateY(-68px)
  }

  #tick_mark:after {
   left: 0;
   bottom: 0;
   width: 100%;
   height: 4px;
   box-shadow: 0 3px 5px rgba(0,0,0,0.23);
   transform: translateX(78px)
  }

  ._checkbox:checked + label {
   background-color: #07d410;
  }

  ._checkbox:checked + label:before {
   width: 0;
   height: 0;
  }

  ._checkbox:checked + label #tick_mark:before, ._checkbox:checked + label #tick_mark:after {
   transform: translate(0);
   opacity: 1;
  }`;

export default BotonCambiarEstado;
