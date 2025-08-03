import * as React from "react";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const UploadButton = () => {
  const fileInputRef = React.useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5180/api/materials/import", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("上传成功");
      window.location.reload(); // 或触发 react-admin 的刷新
    } else {
      const error = await res.text();
      alert("上传失败: " + error);
    }
  };

  return (
    <>
      <Button
        variant="text" // 保持与 ExportButton 一致
        size="small"
        sx={{ maxHeight: 27.5, textTransform: 'capitalize' }} // 保证与 ExportButton 高度一致
        startIcon={<UploadIcon />}
        onClick={() => fileInputRef.current.click()}
      >
        上传 Csv
      </Button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadButton;
