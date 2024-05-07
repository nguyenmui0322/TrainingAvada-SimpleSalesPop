import React from 'react';
import {LegacyCard, Checkbox, Text, Grid} from '@shopify/polaris';
import DesktopPositionInput from '../../../../components/DesktopPositionInput';
import Timing from '../Timing';
import PropTypes from 'prop-types';

const Appearance = ({settings, handleChangeInput}) => {
  const {
    position,
    hideTimeAgo,
    truncateProductName,
    displayDuration,
    firstDelay,
    popsInterval,
    maxPopsDisplay
  } = settings;

  const thePops = [
    {
      id: 1,
      label: 'Hide time ago',
      checked: hideTimeAgo,
      helpText: ' ',
      onChange: () => handleChangeInput('hideTimeAgo', !hideTimeAgo)
    },
    {
      id: 2,
      label: 'Truncate content text',
      checked: truncateProductName,
      helpText:
        "If your product name is long for one line, it will be truncated to 'Product na...' ",
      onChange: () => handleChangeInput('truncateProductName', !truncateProductName)
    }
  ];

  return (
    <>
      <LegacyCard title="APPEARANCE" sectioned>
        <Text>Desktop Position</Text>
        <DesktopPositionInput
          onChange={value => handleChangeInput('position', value)}
          value={position}
        />
        <Text>The display postion of the pop on your website</Text>

        {thePops.map(thePop => {
          return (
            <Checkbox
              key={thePop.id}
              label={thePop.label}
              checked={thePop.checked}
              onChange={thePop.onChange}
              helpText={thePop.helpText}
            />
          );
        })}

        <Text variant="heading2xl" as="h3">
          TIMING
        </Text>
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <Timing
              label="Display duration"
              value={displayDuration}
              onChange={value => handleChangeInput('displayDuration', value)}
              helpText="How long each pop will display on your page."
              suffix={'second(s)'}
            />
            <Timing
              label="Time before the first pop"
              value={firstDelay}
              onChange={value => handleChangeInput('firstDelay', value)}
              helpText="The delay time before the first notification."
              suffix={'second(s)'}
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <Timing
              label="Gap time between two pops"
              value={popsInterval}
              onChange={value => handleChangeInput('popsInterval', value)}
              helpText="The time interval between two popup notifications."
              suffix={'second(s)'}
            />
            <Timing
              label="Maximum of popups"
              value={maxPopsDisplay}
              onChange={value => handleChangeInput('maxPopsDisplay', value)}
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
              suffix={'pop(s)'}
            />
          </Grid.Cell>
        </Grid>
      </LegacyCard>
    </>
  );
};

Appearance.propTypes = {
  settings: PropTypes.object,
  handleChangeInput: PropTypes.func
};

export default Appearance;
