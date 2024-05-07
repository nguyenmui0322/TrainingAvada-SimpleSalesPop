import {LegacyCard, Select, TextField} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

const Restriction = ({settings, handleChangeInput}) => {
  const {includedUrls, excludedUrls, allowShow} = settings;

  const options = [
    {
      label: 'All pages',
      value: 'all',
      page: (
        <TextField
          label="Excluded pages"
          value={excludedUrls}
          onChange={value => handleChangeInput('excludedUrls', value)}
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
        <>
          <TextField
            label="Included pages"
            value={includedUrls}
            onChange={value => handleChangeInput('includedUrls', value)}
            autoComplete="off"
            selectTextOnFocus
            multiline={4}
            helpText="Page URLs to show the pop-up (separated by new lines)"
          />
          <TextField
            label="Excluded pages"
            value={excludedUrls}
            onChange={value => handleChangeInput('excludedUrls', value)}
            autoComplete="off"
            selectTextOnFocus
            multiline={4}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          />
        </>
      )
    }
  ];

  return (
    <LegacyCard title="PAGES RESTRICTION" sectioned>
      <Select
        options={options}
        onChange={value => handleChangeInput('allowShow', value)}
        value={allowShow}
      />
      {options.find(option => option.value === allowShow).page}
    </LegacyCard>
  );
};

export default Restriction;

Restriction.propTypes = {
  settings: PropTypes.object,
  handleChangeInput: PropTypes.func
};
