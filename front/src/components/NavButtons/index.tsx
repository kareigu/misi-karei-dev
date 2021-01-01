import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

type NavButtonProps = {
  to?: string | undefined,
  text: string,
  active?: boolean,
  onClick?: () => void
}

function NavButton(props: NavButtonProps) {

  if(props.to !== undefined) {
    const isRoot = props.to === '/' ? true : false;

    return (
      <Button color="primary">
        <NavLink
          to={props.to}
          exact={isRoot}
          activeStyle={{
            borderBottomColor: "var(--select-color)"
          }}
        >
          {props.text}
        </NavLink>
      </Button>
    );
  } else {
    const active = props.active === undefined ? false : props.active;
    return (
      <Button 
        color="primary"
        style={{
          color: active ? "black" : "white",
          background: active ? "white" : "#282c34",
          marginLeft: "5px",
          marginRight: "5px"
        }}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    )
  }
}

export default NavButton;