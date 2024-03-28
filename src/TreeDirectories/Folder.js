import React, { memo, useContext, useEffect, useState } from "react";
import { TreeDirectoriesContext } from "./TreeDirectories";
import TreeItem from "./TreeItem";

const Folder = ({ isRoot, directory, path }) => {
  const { fetchItemsFn, rootName, defaultExpand } = useContext(
    TreeDirectoriesContext
  );

  const [fetchFlag, setFetchFlag] = useState(isRoot || defaultExpand);
  const [expand, setExpand] = useState(isRoot || defaultExpand);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (fetchFlag) {
      fetchItemsFn(isRoot ? rootName : path).then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [directory, fetchItemsFn, isRoot, fetchFlag, rootName, path]);

  const handleToggleExpand = () => {
    if (!fetchFlag) setFetchFlag(true);
    setExpand((ex) => !ex);
  };

  return (
    <div className={`tree-item ${expand ? "expand" : ""}`}>
      <p className="tree-item--name" onClick={handleToggleExpand}>
        <span style={{ paddingRight: 12 }}>{expand ? "▼" : "▲"}</span>
        {isRoot ? rootName ?? "root" : directory?.name ?? "Unknown Directory"}
      </p>
      {fetchFlag && (
        <div className="folder--items">
          {loading ? (
            <div>Loading items...</div>
          ) : !!data?.entries?.length ? (
            data.entries.map((item) => (
              <TreeItem key={item.name} item={item} parentPath={path} />
            ))
          ) : (
            <div className="folder--items--empty">Directory is empty.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Folder);
