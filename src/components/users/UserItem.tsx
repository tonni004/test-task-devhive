"use client";

import {useState} from "react";
import {User} from "@/types/user";
import EditUserForm from "./EditUserForm";
import s from "./UserItem.module.css";

interface Props {
  user: User;
  onSave: (user: User) => void;
}

export default function UserItem({user, onSave}: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div className={s.listItem}>
      {editing ? (
        <EditUserForm user={user} onSave={(user: User) => {
          onSave(user);
          setEditing(false);
        }}/>
      ) : (
        <>
          <div className={s.cardContainer}>
            <p className={`${s.cardName} ${s.cardText}`}>{user.name}</p>
            <p className={s.cardText}>{user.email}</p>
            <p className={s.cardText}>{user.address.city}</p>
            <button className={s.editButton} onClick={() => setEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}
