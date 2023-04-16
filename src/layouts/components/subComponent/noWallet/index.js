// prop-types is a library for typechecking of props
import PropTypes, { bool } from "prop-types";

import { Avatar, Box, Typography } from "@mui/material";

function WalletContent({ value, image}) {


  return (
    <Box textAlign="center">
      <Box display="flex" justifyContent="center">
     <Avatar src={image} sx={{ height: "15rem", width: "15rem" }}></Avatar>
     </Box>
      <Typography
        variant='h6' fontWeight="bold" sx={{ marginBottom: 1.5 }}
      >
        {value}

    </Typography>
    </Box>
  );
}

// Setting default values for the props of WalletContent
WalletContent.defaultProps = {
  suffix: "",
};

// Typechecking props for the WalletContent
WalletContent.propTypes = {
  value: PropTypes.string.isRequired,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default WalletContent;
