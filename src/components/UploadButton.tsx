import * as React from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadButtonProps {
  onSuccess?: () => void;
  resource?: "materials" | "bom" | "sales" | "stock" | "supplier" | "materialRequest";
}

const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess, resource = "materials" }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [notify, setNotify] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const handleClose = () => {
    setNotify({ open: false, message: "" });
  };

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
      setNotify({ open: true, message: "上传成功" });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      const error = await res.text();
      setNotify({ open: true, message: "上传失败: " + error });
    }
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        sx={{
          maxHeight: 27.5, textTransform: 'capitalize', top: '-5px', '& span': {

            marginRight: '2px',
          }
        }}
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

      <Snackbar
        open={notify.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  // 这里改成你想要的位置
      >
        <Alert onClose={handleClose} severity={notify.message.startsWith('上传失败') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {notify.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadButton;
