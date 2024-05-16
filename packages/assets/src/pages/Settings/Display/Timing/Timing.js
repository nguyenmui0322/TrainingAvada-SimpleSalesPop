import React from 'react';
import {RangeSlider} from '@shopify/polaris';
import PropTypes from 'prop-types';

const Timing = ({label, value, onChange, helpText, suffix, maxValue, minValue}) => {
  return (
    <RangeSlider
      label={label}
      value={value}
      onChange={onChange}
      output
      suffix={
        <div
          style={{
            borderRadius: '1px',
            border: '1px solid #ddd',
            padding: '5px 10px',
            width: '110px'
          }}
        >
          {`${value} ${suffix}`}
        </div>
      }
      helpText={helpText}
      min={minValue}
      max={maxValue}
    />
  );
};

Timing.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  suffix: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number
};

export default Timing;
