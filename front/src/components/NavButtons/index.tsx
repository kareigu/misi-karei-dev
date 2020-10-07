import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

type NavButtonProps = {
  to: string,
  text: string
}

function NavButton(props: NavButtonProps) {
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
}

export default NavButton;