import React from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

interface TemplateDownloadButtonProps {
  href?: string;
  label?: string;
}

const TemplateDownloadButton: React.FC<TemplateDownloadButtonProps> = ({
  href = "/templates/material_template.csv",
  label = "下载模板",
}) => (
  <Button
    variant="text"
    size="small"
    startIcon={<DownloadIcon />}

    sx={{
      textTransform: 'capitalize', ml: 1, maxHeight: 27.5, '&.MuiButton-root': {
        top: '-5px', marginLeft: '0' // 调整按钮位置;
      }, '& span': {

        marginRight: '2px', marginLeft: '0',
      }
    }}
    component="a"
    href={href}
    download
  >
    {label}
  </Button>
);

export default TemplateDownloadButton;