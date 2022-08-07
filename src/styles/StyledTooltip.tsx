import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

export const StyledTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#ac0537",
      color: "#fff",
      boxShadow: theme.shadows[5],
      fontSize: 11,
    },
    arrow: {
      color: "#ac0537",
    }
  }))(Tooltip);