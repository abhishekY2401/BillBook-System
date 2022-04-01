import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ phone_number: phone, password: password });
  }, [phone, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(phone);
    console.log(password);
    console.log(formData);

    axios
      .post(`https://billbook.dotminds.in/public/api/user/login`, formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        if (res.data.success) {
          setMessage("Successfully Logged In");
        } else {
          setMessage("Invalid Login");
        }
        setPhone("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div>
      {message && <div className="message">{message && <p>{message}</p>}</div>}
      <div className="login">
        {error ? (
          <div className="errors">
            <p>{error}</p>
          </div>
        ) : null}

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
