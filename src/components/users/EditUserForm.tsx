"use client";

import {useState} from "react";
import {Field, FormState, User} from "@/types/user";
import {isValidEmail} from "@/lib/validators";
import s from "./EditUserForm.module.css";

interface Props {
  user: User;
  onSave: (user: User) => void;
}

export default function EditUserForm({user, onSave}: Props) {
  const [form, setForm] = useState<FormState>({
    name: user.name,
    email: user.email,
    city: user.address.city,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: Field, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    const updatedUser: User = {
      ...user,
      ...form,
      address: {
        ...user.address,
        city: form.city,
      },
    };

    try {
      setError("");
      setLoading(true);

      // Імітація асинхронної функції для демонстрації відловлювання помилок та зміні кнопки при стані завантаження при редагуванні картки
      await new Promise((resolve) => setTimeout(resolve, 600));

      onSave(updatedUser);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.formContainer} onSubmit={handleSubmit}>
      <input value={form.name} onChange={(e) => handleChange("name", e.target.value)}/>
      <input value={form.email} onChange={(e) => handleChange("email", e.target.value)}/>
      {error && <p className={s.formError}>&#42;{error}</p>}
      <input value={form.city} onChange={(e) => handleChange("city", e.target.value)}/>
      <button className={s.saveButton} type="submit" disabled={loading}>{loading ? 'Loading..' : 'Save'}</button>
    </form>
  );
}
