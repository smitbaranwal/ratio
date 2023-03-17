import * as React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const safes = ['0x39cBD3814757Be997040E51921e8D54618278A08', '0x39cBD3814757Be997040E51921e8D54618278A09', '0x39cBD3814757Be997040E51921e8D54618278A10'];

function SafeDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Safe Account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {safes.map((safe) => (
          <ListItem disableGutters key={safe}>
            <ListItemButton onClick={() => handleListItemClick(safe)} key={safe}>
              <ListItemAvatar>
                <Avatar src='/images/safe_icon.png' sx={{ bgcolor: blue[100], color: blue[600] }}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={safe} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SafeDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SafeDemo({ handleSafe, closeSafeDialog }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  React.useEffect(() => {
    handleSafe.current = handleClickOpen
  }, [handleSafe])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    closeSafeDialog(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography> */}
      <br />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open safe Dialog
      </Button> */}
      <SafeDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}