import React, { memo, useContext, useState } from "react";
import Modal, { useModal } from "../Modal/Modal";
import { TreeDirectoriesContext } from "./TreeDirectories";

const File = ({ file, path }) => {
  const { fetchFileContentFn } = useContext(TreeDirectoriesContext);
  const { isShowing, toggle } = useModal();
  const [content, setContent] = useState();
  const handleShowFileContent = async () => {
    if (!content) {
      const fetchedContent = await fetchFileContentFn(file.name);
      setContent(fetchedContent);
    }
    toggle();
  };
  return (
    <div className={`tree-item `}>
      <p onClick={handleShowFileContent} className="tree-item--name">
        {file?.name ?? "Unknown file"}
      </p>
      <Modal isShowing={isShowing} hide={toggle} title={file.name}>
        {content?.contents}
      </Modal>
    </div>
  );
};

export default memo(File);
