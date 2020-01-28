import React from 'react';
import {
  Scheduler,
  WeekView,
  Appointments,
  TodayButton,
  DateNavigator,
  Toolbar,
  CurrentTimeIndicator,
  EditingState,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class AvailabilityCalendar extends React.Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Paper>
          <Scheduler>
            <ViewState />
            <WeekView startDayHour={8} endDayHour={17} />
            <Appointments />
            <Toolbar/>
            <DateNavigator/>
            <TodayButton/>
            <CurrentTimeIndicator
            shadePreviousCells />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default AvailabilityCalendar;
