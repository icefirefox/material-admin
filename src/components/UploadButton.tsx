import * as React from "react";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadButtonProps {
  onSuccess?: () => void;
  resource?: "materials" | "bom";
}

const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess, resource = "materials" }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5180/api/${resource}/import`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("上传成功");
      if (onSuccess) {
        onSuccess();
      }
    } else {
      const error = await res.text();
      alert("上传失败: " + error);
    }
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        sx={{ maxHeight: 27.5, textTransform: 'capitalize' }}
        startIcon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        上传 Csv
      </Button>
      <input
        type="file"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadButton;