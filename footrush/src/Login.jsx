import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful 🚀");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created 🎉");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f2027, #2c5364)"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(15px)",
        padding: "40px",
        borderRadius: "15px",
        color: "white",
        width: "300px"
      }}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />

        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          background: "#00ff88",
          border: "none",
          cursor: "pointer"
        }}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", marginTop: "10px" }}>
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </form>
    </div>
  );
}
