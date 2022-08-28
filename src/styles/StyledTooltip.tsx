import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

export const StyledTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#8168ff",
      color: "#FFFFFF",
      boxShadow: theme.shadows[5],
      fontSize: 11,
    },
    arrow: {
      color: "#8168ff",
    }
  }))(Tooltip);