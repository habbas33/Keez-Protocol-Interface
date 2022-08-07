import { withStyles } from "@material-ui/core/styles";
import { MenuItem } from '@material-ui/core';

export const StyledMenuItem = withStyles(theme => ({
  root: {
    fontFamily: "Open Sans",
  },
  }))(MenuItem);

