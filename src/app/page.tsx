import s from "./page.module.css";
import {getUsers} from "@/lib/api";
import UsersList from "@/components/users/UsersList";

export default async function Home() {
  const users = await getUsers();

  return (
    <div className={s.page}>
      <UsersList initialUsers={users}/>
    </div>
  );
}
