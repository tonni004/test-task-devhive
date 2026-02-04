"use client";

import {useMemo, useState} from "react";
import {User} from "@/types/user";
import Filters from "./Filters";
import UserItem from "./UserItem";
import s from "./UsersList.module.css";

interface Props {
  initialUsers: User[];
}

export default function UsersList({initialUsers}: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  // в цьому тестовому(для 10 користувачів) useMemo не обов'язковий, але залишила його для демонстрації оптимізації, якби користувачів було більше
  const filteredUsers: User[] = useMemo(() => {
    return users.filter((user: User) => {
      const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city ? user.address.city === city : true;
      return matchesName && matchesCity;
    });
  }, [users, search, city]);

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prev: User[]) =>
      prev.map((user: User) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <>
      <div>
        <h1 className={s.title}>Users</h1>
        <Filters users={users} search={search} setSearch={setSearch} city={city} setCity={setCity}/>
      </div>
      <div className={s.usersList}>
        {filteredUsers.map((user: User) => (
          <UserItem key={user.id} user={user} onSave={handleSaveUser}/>
        ))}
        {filteredUsers.length === 0 && <p>No users found</p>}
      </div>
    </>
  );
}
