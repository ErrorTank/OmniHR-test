import React, { memo } from "react";
import File from "./File";
import Folder from "./Folder";

const TreeItem = ({ isRoot, item, parentPath }) => {
  const isFolder = isRoot ?? item.type === "directory";
  const path = item?.name
    ? parentPath
      ? [parentPath, item.name].join("/")
      : item.name
    : "";
  if (!isFolder) return <File file={item} path={path} />;
  return <Folder isRoot={isRoot} directory={item} path={path} />;
};

export default memo(TreeItem);
