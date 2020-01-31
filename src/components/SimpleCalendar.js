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
    const ExampleCustomInput = ({ value, onClick }) => (
      <Button
        className="custom-input"
        onClick={onClick}
        color="primary"
        variant="outlined">
        {value}
      </Button>
    );
    const { minTime, maxTime } = this.props;
    const { currentDate } = this.state;
    return (
      <DatePicker
        placeholderText="Click to select date/time"
        selected={ currentDate }
        onChange={ date => this.changeDate(date) }
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        // shouldCloseOnSelect={false}
        // customInput={<ExampleCustomInput />}
        // customInputRef="custom-input"
        minDate={new Date()}
        minTime={new Date().setHours(minTime)}
        maxTime={new Date().setHours(maxTime)}/>
    );
  }
}

SimpleCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedTime: PropTypes.object,
  minTime: PropTypes.number,
  maxTime: PropTypes.number,
}

export default SimpleCalendar;
