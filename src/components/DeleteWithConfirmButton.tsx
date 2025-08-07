import { useDelete, useNotify, useRefresh, Confirm, Button } from 'react-admin';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { SxProps } from '@mui/material';

interface DeleteWithConfirmButtonProps {
  record: any;
  resource: string; // 新增资源参数
  sx?: SxProps;
}

const DeleteWithConfirmButton = ({ record, resource, sx }: DeleteWithConfirmButtonProps) => {
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const [deleteOne, { isLoading }] = useDelete(resource, { id: record.id }, {
    onSuccess: () => {
      notify('Deleted successfully');
      setOpen(false);
      refresh();
    },
    onError: (error: any) => {
      if (error?.status === 409) {
        notify('该物料已被其他数据引用，无法删除。', { type: 'error' });
      } else {
        notify('Error: could not delete', { type: 'error' });
      }
    },
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirm = () => deleteOne();
  const handleCancel = () => setOpen(false);

  return (
    <>
      <Button
        sx={{ textTransform: 'capitalize', ...sx }}
        onClick={handleClick}
        disabled={isLoading}
      >
        <DeleteIcon />
        Delete
      </Button>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title="Confirm Delete"
        content="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
        onClose={handleCancel}
      />
    </>
  );
};

export default DeleteWithConfirmButton;