import React from 'react';
import {LegacyCard, Checkbox, Text} from '@shopify/polaris';
import DesktopPositionInput from '../../../../components/DesktopPositionInput';
import Timing from '../Timing';
import PropTypes from 'prop-types';

const Appearance = ({settings, onChangeInput}) => {
  const {
    position,
    hideTimeAgo,
    truncateProductName,
    displayDuration,
    firstDelay,
    popsInterval,
    maxPopsDisplay
  } = settings;

  const timings = [
    {
      id: 1,
      label: 'Display duration',
      value: displayDuration,
      helpText: 'How long each pop will display on your page.',
      suffix: 'second(s)',
      onChange: value => onChangeInput('displayDuration', value)
    },
    {
      id: 2,
      label: 'Time before the first pop',
      value: firstDelay,
      helpText: 'The delay time before the first notification.',
      suffix: 'second(s)',
      onChange: value => onChangeInput('firstDelay', value)
    },
    {
      id: 3,
      label: 'Gap time between two pops',
      value: popsInterval,
      helpText: 'The time interval between two popup notifications.',
      suffix: 'second(s)',
      onChange: value => onChangeInput('popsInterval', value)
    },
    {
      id: 4,
      label: 'Maximum of popups',
      value: maxPopsDisplay,
      helpText:
        'The maximum number of popups are allowed to show after page loading. Maximum number is 80.',
      suffix: 'pop(s)',
      onChange: value => onChangeInput('maxPopsDisplay', value)
    }
  ];

  const thePops = [
    {
      id: 1,
      label: 'Hide time ago',
      checked: hideTimeAgo,
      helpText: ' ',
      onChange: () => onChangeInput('hideTimeAgo', !hideTimeAgo)
    },
    {
      id: 2,
      label: 'Truncate content text',
      checked: truncateProductName,
      helpText:
        "If your product name is long for one line, it will be truncated to 'Product na...' ",
      onChange: () => onChangeInput('truncateProductName', !truncateProductName)
    }
  ];

  return (
    <div>
      <LegacyCard title="APPEARANCE" sectioned>
        <Text>Desktop Position</Text>
        <DesktopPositionInput
          onChange={value => onChangeInput('position', value)}
          value={position}
        />
        <Text>The display postion of the pop on your website</Text>

        <div style={{marginTop: '10px'}}>
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
        </div>

        <div style={{marginTop: '10px'}}>
          <Text variant="heading2xl" as="h3">
            TIMING
          </Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            {timings.map(timing => {
              return (
                <div style={{width: 'calc(50% - 12px)'}} key={timing.id}>
                  <Timing
                    label={timing.label}
                    value={timing.value}
                    onChange={timing.onChange}
                    helpText={timing.helpText}
                    suffix={timing.suffix}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </LegacyCard>
    </div>
  );
};

Appearance.propTypes = {
  settings: PropTypes.object,
  onChangeInput: PropTypes.func
};

export default Appearance;
