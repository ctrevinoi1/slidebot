import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileUpload: (file: File) => void;
  loading: boolean;
  error: string;
};

const Dropzone: React.FC<Props> = ({ onFileUpload, loading, error }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
        ".pptx",
      ],
    },
    disabled: loading,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full max-w-xl h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer transition-colors duration-300 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-white"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            {loading ? "Generating quiz..." : isDragActive ? "Drop the file here..." : "Drag & drop a PDF or PPTX here"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {loading ? "This may take a moment..." : "or click to select file"}
          </p>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Dropzone; 