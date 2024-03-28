import { useCallback } from "react";
import "./App.css";
import TreeDirectories from "./TreeDirectories/TreeDirectories";

// Use this Component if copying it to another React repo
const Component = () => {
  const fetchItemsInDirectory = useCallback(async (path) => {
    return fetch(`http://localhost:8080/fs?path=${encodeURIComponent(path)}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  const fetchFileContent = useCallback(async (path) => {
    return fetch(`http://localhost:8080/fs?path=${encodeURIComponent(path)}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);
  return (
    //We can dettach the fetchFileContentFn -> onFileClicked to handle displaying
    //file content outside of the AsyncTreeDirectories, make it more flexible if we have additional side effects

    //We also can provide more props to handle Synchronous directories
    //(All items are availble initially and are passed into the AsyncTreeDirectories)
    <TreeDirectories
      async
      defaultExpand={false}
      fetchFileContentFn={fetchFileContent}
      fetchItemsFn={fetchItemsInDirectory}
      rootName="root"
    />
  );
};

function App() {
  return (
    <div className="App">
      <div className="container">
        <Component />
      </div>
    </div>
  );
}

export default App;
