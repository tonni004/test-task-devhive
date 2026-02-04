import {User} from "@/types/user";
import {useMemo} from "react";
import s from "./Filters.module.css";

interface Props {
  users: User[];
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
}

export default function Filters({users, search, setSearch, city, setCity}: Props) {
  // useMemo використовується, щоб не перераховувати міста кожен рендер
  const cities = useMemo(() => [...new Set(users.map(u => u.address.city))], [users]);

  // Для покращення читабельності винесла функції handleSearchChange та handleCityChange, щоб передавати в onChange більш лаконічну версію
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className={s.container}>
      <input
        className={s.searchInput}
        placeholder="Search by name"
        value={search}
        onChange={handleSearchChange}
      />
      <select className={s.selectCity} value={city} onChange={handleCityChange}>
        <option value="">All cities</option>
        {cities.map((c: string) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
