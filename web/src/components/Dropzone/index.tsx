import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    // Recebe apenas um arquivo de imagem
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);

    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      {/* Caso queria colocar mais de um arquivo coloque a propriedade multi */}
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl ? (
          <img src={selectedFileUrl} alt="Point trumbnail" />
        ) : (
          <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
        )
      }
      
    </div>
  );
};

export default Dropzone;
