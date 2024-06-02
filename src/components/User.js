import { useEffect, useState } from "react";

const User = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // API Calls

    let timer = setInterval(() => {
      console.log("Hello Pratham!!");
    }, 1000);

    return () => {
      console.log("useEffect return ");
      clearInterval(timer);
    };
  }, []);

  async function getUserInfo() {}

  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <h2>Name: {props.name}</h2>
      <h3>Location: Pune</h3>
      <h4>Contact: prathameshnadhe06@gmail.com</h4>
    </div>
  );
};

export default User;
