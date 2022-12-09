import React, { useEffect, useState } from "react";
import "./Login.css";
import { db } from "./firebase-config";
import {doc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginfields, setloginfields] = useState({ email: "", password: "" });
  const [registerfields, setRegisterfields] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    number: "",
  });
  const [loginView, setLoginView] = useState(true);
  const authentication = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const islogin = localStorage.getItem("login");

    if (islogin) {
      navigate("/dashboard");
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      authentication,
      registerfields.email,
      registerfields.password
    ).then(async (response) => {
      console.log(response);
      const userref = doc(db, "users", response.user.uid);
      setDoc(userref, {
        name: registerfields.name,
        email: registerfields.email,
        dob: registerfields.dob,
        phone: registerfields.number,
      })
        .then((res) => {
          console.log(res);
          alert("user Registered");
          setLoginView(true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      authentication,
      loginfields.email,
      loginfields.password
    )
      .then((res) => {
        console.log(res);
        alert("user login");
        localStorage.setItem("login", true);
        localStorage.setItem("profile", res.user.uid);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
        alert("Invalid credentials");
      });
  };

  return (
    <div>
      <div className="split left">
        <div clasName="centered"></div>
      </div>

      <div className="split right">
        <div className="centered">
          {loginView ? (
            <>
              <h3>Welcome back</h3>
              <h1>Login to your account</h1>
              <form className="form" onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Enter Email"
                  required
                  value={loginfields.email}
                  onChange={(e) =>
                    setloginfields({ ...loginfields, email: e.target.value })
                  }
                />
                <input
                  type={"password"}
                  placeholder="Enter Password"
                  required
                  value={loginfields.gpassword}
                  onChange={(e) =>
                    setloginfields({ ...loginfields, password: e.target.value })
                  }
                />
                <br></br>
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setLoginView(false)}> Register</span>{" "}
              </p>
            </>
          ) : (
            <>
              <h1>Register your account</h1>
              <form className="form" onSubmit={handleRegister}>
                <input
                  type={"email"}
                  placeholder="Enter Email"
                  required
                  value={registerfields.email}
                  onChange={(e) =>
                    setRegisterfields({
                      ...registerfields,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type={"password"}
                  placeholder="Enter Password"
                  req
                  value={registerfields.password}
                  onChange={(e) =>
                    setRegisterfields({
                      ...registerfields,
                      password: e.target.value,
                    })
                  }
                />
                <input
                  type={"number"}
                  placeholder="Enter Phone Number"
                  req
                  value={registerfields.number}
                  onChange={(e) =>
                    setRegisterfields({
                      ...registerfields,
                      number: e.target.value,
                    })
                  }
                />
                <input
                  type={"text"}
                  placeholder="Enter Full Name"
                  req
                  value={registerfields.name}
                  onChange={(e) =>
                    setRegisterfields({
                      ...registerfields,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type={"date"}
                  placeholder="Enter DOB"
                  req
                  value={registerfields.dob}
                  onChange={(e) =>
                    setRegisterfields({
                      ...registerfields,
                      dob: e.target.value,
                    })
                  }
                />
                <br />
                <label>Profile image</label>
                <input
                  id="image"
                  type="file"
                  required
                  accept="image/png, image/jpeg"
                />
                <button type="submit">Register</button>
              </form>
              <p>
                Have an account?{" "}
                <span onClick={() => setLoginView(true)}>Login</span>{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
