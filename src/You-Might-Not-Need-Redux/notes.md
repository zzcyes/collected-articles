# You Might Not Need Redux

作者在一开篇就提出了许多开发人员在选择 Redux 或使用 Redux 时的疑惑：

- 为什么我们的应用没有它就无法扩展？

- 为什么要建立三个文件才能让一个简单的功能发挥作用？

作者认为：

- 人们将他们的困境归咎于 Redux、React、函数式编程、不变性和许多其他事情。

- 很自然地将 Redux 与不需要“样板”代码来更新状态的方法进行比较，并得出结论 Redux 只是复杂。
  
## 限制

Redux 提供了一个折衷方案。它要求您：

- 将应用程序状态描述为普通对象和数组。

- 将系统中的变化描述为普通对象。

- 将处理更改的逻辑描述为纯函数。

不管有没有 React ,构建应用程序都不需要这些限制。事实上，这些都是非常强的约束，即使在应用程序的某些部分中，你也应该在采用它们之前仔细考虑。

## 吸引力

接着作者列出了有助于构建应用程序的吸引力：

- 将状态持久化到本地存储，然后从它启动，开箱即用。

- 在服务器上预填充状态，以 HTML 格式将其发送到客户端，然后从它启动，开箱即用。

- 序列化用户操作并将它们与状态快照一起附加到自动错误报告中，以便产品开发人员可以重放它们以重现错误。

- 通过网络传递动作对象以实现协作环境，而无需对代码的编写方式进行重大更改。

- 维护撤消历史记录或实施乐观突变，而无需对代码的编写方式进行重大更改。

- 在开发中的状态历史之间穿梭，并在代码更改时从动作历史中重新评估当前状态，例如 TDD。

- 为开发工具提供完整的检查和控制功能，以便产品开发人员可以为他们的应用程序构建自定义工具。

- 在重用大部分业务逻辑的同时提供替代 UI。

如果您正在使用可扩展终端、JavaScript 调试器或某些类型的 webapps，那么可能值得一试，或者至少考虑一下它的一些想法（顺便说一下，它们并不新鲜！）

但是如果**你刚刚开始学习 React，不要把 Redux 作为你的第一选择**。

相反，要学会在**React中思考[(Thinking in React)](https://reactjs.org/docs/thinking-in-react.html)**。如果你真的需要Redux，或者你想尝试一些新的东西，请回到Redux。但是要谨慎地使用它，就像您使用任何高度固执己见的工具一样。

如果你觉得有压力去做事情“ Redux 的方式”，这可能是一个信号，你或你的队友太认真了。这只是你工具箱里的一个工具，一个疯狂的实验。

## 不使用Redux也可以应用Redux想法

### 计数器组件

```javascript
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [state, setState] = useState({ value: 0 });

  const increment = () => {
     setState((prevState) => prevState.value + 1);
  };

  const decrement = () => {
     setState((prevState) => prevState.value - 1);
  };

  return (
    <div className="App">
      {state.value}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

可以看到，这个组件没什么问题，能够正常运行，逻辑也清晰。

### 计数器组件（应用Redux想法）

Redux 提供的折衷方案是增加间接性，将“发生了什么”与“事情如何变化”分离开来。

文中多次提到`tradeoff(折衷)`一词，在作者看来，Redux 并不总是好的选择，只不过采用了折衷的方式。

如下，从组件提取出一个 Reducer：
  
```javascript
import { useState } from "react";
import "./styles.css";

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
    <div className="App">
      {state.value}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

可以注意到，这里用到了 Redux 想法但是没有通过 `npm install` 去运行。

您应该对有状态组件这样做吗?可能不会。也就是说，除非您计划从这个额外的间接过程中获益。按照我们这个时代的说法，制定计划就是🔑。

Redux 库本身只是一组将 reducer “装入”到单个全局存储对象的帮助程序。你可以使用少量或大量的 Redux ，因为你喜欢。

但是如果你要交换一些东西，确保你得到一些回报。


## 总结

作者文中多次提到` tradoff (折衷)`一词，在我看来，是否使用 Redux ——取决于你是否能**从 Redux 得到你想要得到的东西，但同时也会有牺牲**，如同作者一开篇提到的人们的疑惑——为什么要建立三个文件才能让一个简单的功能发挥作用？

## links

- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

