# How to fetch data with React Hooks

## REDUCER HOOK FOR DATA FETCHING

```javascript
const [state, dispatch] = useReducer(dataFetchReducer, {
  isLoading: false,
  isError: false,
  data: initialData
});
```

解构语句用于保持**状态对象不可变——这意味着状态永远不会直接改变——以强制执行最佳实践**。

```javascript
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
```

Reducer Hook 让我们能够**始终得到一个可以预测的状态改变，并且不会遇到无效的状态**。


举个例子，之前可能会意外地将 isLoading 和 isError 状态设置为 true。在这种情况下，UI中应该显示什么？现在，reducer 函数定义的每个状态转换都会导致一个有效的状态对象。

```diff
  const useHackerNewsApi = () => {
-   const [data, setData] = useState({ hits: [] });
    const [url, setUrl] = useState(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
-   const [isLoading, setIsLoading] = useState(false);
-   const [isError, setIsError] = useState(false);
+   const [state, dispatch] = useReducer(dataFetchReducer, {
+     isLoading: false,
+     isError: false,
+     data: initialData
+   });

    useEffect(() => {
      const fetchData = async () => {
-       setIsError(false);
-       setIsLoading(true);
+       dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(url);
-         setData(result.data);
+         dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (error) {
-         setIsError(true);
+         dispatch({ type: 'FETCH_FAILURE' });
        }
-        setIsLoading(false);
      };
      fetchData();
    }, [url]);

-    return [{ data, isLoading, isError }, setUrl];
+    return [state, setUrl]
}
```




## links

- [the-road-to-learn-react/use-data-api: Custom hook for React Components to fetch data from an API.](https://github.com/the-road-to-learn-react/use-data-api)