import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router";

function CreateUser() {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72 bg-white"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
