import {LegacyCard, Select, TextField} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

const Restriction = ({settings, onChangeInput}) => {
  const {includedUrls, excludedUrls, allowShow} = settings;

  const options = [
    {
      label: 'All pages',
      value: 'all',
      page: (
        <TextField
          label="Excluded pages"
          value={excludedUrls}
          onChange={value => onChangeInput('excludedUrls', value)}
          autoComplete="off"
          selectTextOnFocus
          multiline={4}
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        />
      )
    },
    {
      label: 'Specific pages',
      value: 'specific',
      page: (
        <div>
          <TextField
            label="Included pages"
            value={includedUrls}
            onChange={value => onChangeInput('includedUrls', value)}
            autoComplete="off"
            selectTextOnFocus
            multiline={4}
            helpText="Page URLs to show the pop-up (separated by new lines)"
          />
          <div style={{marginTop: '15px'}}>
            <TextField
              label="Excluded pages"
              value={excludedUrls}
              onChange={value => onChangeInput('excludedUrls', value)}
              autoComplete="off"
              selectTextOnFocus
              multiline={4}
              helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <LegacyCard title="PAGES RESTRICTION" sectioned>
      <Select
        options={options}
        onChange={value => onChangeInput('allowShow', value)}
        value={allowShow}
      />
      <div style={{marginTop: '15px'}}>
        {options.find(option => option.value === allowShow).page}
      </div>
    </LegacyCard>
  );
};

export default Restriction;

Restriction.propTypes = {
  settings: PropTypes.object,
  onChangeInput: PropTypes.func
};
