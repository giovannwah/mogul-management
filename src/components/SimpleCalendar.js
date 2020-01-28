import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {
  Button
} from '@material-ui/core';

import 'react-datepicker/dist/react-datepicker.css';

class SimpleCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: null,
    };
  }

  componentDidMount() {
    const { selectedTime } = this.props;
    this.setState({ currentDate: selectedTime || new Date() })
  }

  changeDate = (date) => {
    const { onChange } = this.props;
    this.setState({ currentDate: date });
    // callback
    onChange(date);
  }

  render() {
    const customInput = ({ value, click }) => (
      <Button
        variant="outlined"
        color="primary"
        onClick={click}>
        { value }
      </Button>
    );
    const { currentDate } = this.state;
    return (
      <DatePicker
        selected={ currentDate }
        onChange={ date => this.changeDate(date) }
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        shouldCloseOnSelect={false}
        customInput={customInput}
        // customInput={({ value, click }) => (
        //                 <Button
        //                   variant="outlined"
        //                   color="primary"
        //                   onClick={click}>
        //                   { value }
        //                 </Button>
        //               )}
        minDate={new Date()}
        minTime={new Date().setHours(7)}
        maxTime={new Date().setHours(17)}/>
    );
  }
}

SimpleCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default SimpleCalendar;
