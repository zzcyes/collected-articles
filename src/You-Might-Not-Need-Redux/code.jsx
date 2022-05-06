import { useState } from "react";

export default function App() {
  const [state, setState] = useState({ value: 0 });
  const counter = (state = { value: 0 }, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { value: state.value + 1 };
      case "DECREMENT":
        return { value: state.value - 1 };
      default:
        return state;
    }
  };

  const dispatch = (action) => {
    setState((prevState) => counter(prevState, action));
  };

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      {state.value}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}