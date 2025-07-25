import React from 'react';
import styled from 'styled-components';

interface BotonFlotanteProps {
  onClick: () => void;
  
}

const BotonAgregarTarea = ({ onClick  }: BotonFlotanteProps) => {
  return (
    
    <StyledWrapper>
      <button className="cssbuttons-io" onClick={onClick}>
        <span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor" />
          </svg>
          Nueva tarea</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cssbuttons-io {
  position: fixed;         /* 👈 cambio clave */
  bottom: 2rem;            /* distancia desde abajo */
  right: 2rem;             /* distancia desde la derecha */

  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.05em;
  border-radius: 0.8em;
  cursor: pointer;
  border: none;
  background: linear-gradient(to right,rgb(45, 226, 90),rgb(10, 148, 0));
  color: ghostwhite;
  overflow: hidden;
  z-index: 1000;           /* asegúrate de que esté por encima de todo */
}

.cssbuttons-io svg {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
}

.cssbuttons-io span {
  position: relative;
  z-index: 10;
  transition: color 0.4s;
  display: inline-flex;
  align-items: center;
  padding: 0.8em 1.2em 0.8em 1.05em;
}

.cssbuttons-io::before,
.cssbuttons-io::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.cssbuttons-io::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.cssbuttons-io:hover::before {
  transform: translate3d(100%, 0, 0);
}

.cssbuttons-io:active {
  transform: scale(0.95);
}
`;

export default BotonAgregarTarea;
