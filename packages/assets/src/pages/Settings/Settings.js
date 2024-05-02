import React, {useCallback, useState} from 'react';
import {Layout, LegacyCard, Page, LegacyTabs} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup';
import Appearance from './Display/Appearance';
import Restriction from './Triggers/Restriction';
import {defaultSettings} from '../../helpers/defaultSettings';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [valueSetting, setValueSetting] = useState(defaultSettings);

  const items = {
    id: '1',
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    productImage:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
  };

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const onChangeInput = (key, value) => setValueSetting(prev => ({...prev, [key]: value}));

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      panelID: 'display',
      contentTab: <Appearance settings={valueSetting} onChangeInput={onChangeInput} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers',
      contentTab: <Restriction settings={valueSetting} onChangeInput={onChangeInput} />
    }
  ];

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onAction: () => {}}}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup
            city={items.city}
            country={items.country}
            firstName={items.firstName}
            productImage={items.productImage}
            productName={items.productName}
            timestamp={items.timestamp}
          ></NotificationPopup>
        </Layout.Section>

        <Layout.Section>
          <LegacyCard>
            <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].contentTab}
            </LegacyTabs>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
