import React, { memo, useMemo } from "react";
import "./TreeDirectories.css";
import TreeItem from "./TreeItem";

const TreeDirectoriesContext = React.createContext({});

export { TreeDirectoriesContext };

// Only implement for Async Tree fetching

const TreeDirectories = ({
  fetchFileContentFn,
  fetchItemsFn,
  async,
  defaultExpand,
  rootName,
}) => {
  const contextValue = useMemo(
    () => ({
      fetchFileContentFn,
      fetchItemsFn,
      async,
      defaultExpand,
      rootName,
    }),
    [fetchFileContentFn, fetchItemsFn, async, defaultExpand, rootName]
  );
  return (
    <TreeDirectoriesContext.Provider value={contextValue}>
      <TreeItem isRoot />
    </TreeDirectoriesContext.Provider>
  );
};

export default memo(TreeDirectories);
