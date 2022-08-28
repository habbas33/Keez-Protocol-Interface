import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const StyledPopover = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      backgroundColor: "#8168ff",
      fontSize: "0.875rem",
    },
  }),
);