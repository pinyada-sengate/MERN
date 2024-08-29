import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  //TODO: will fetch from db later
  const USERS = [
    {
      id: "u1",
      name: "Pizza",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeilFR4pfeMxzs0atfZMY-50F1ZYVc8I5ynAqDlfRh3TUfTPJqRim7FUYOig&s",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
