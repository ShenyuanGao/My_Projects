"use client"

import { Dropdown } from "flowbite-react";

const UserDropDown = (props) => {
  return (
    <Dropdown label={props.name} dismissOnClick={false} inline>
      <Dropdown.Item onClick={() => document.location.href="/order_history"}>Order history</Dropdown.Item>
      <Dropdown.Item onClick={() => props.logout()}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default UserDropDown;
