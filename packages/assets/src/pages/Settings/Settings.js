import React, {useCallback, useState} from 'react';
import {Layout, LegacyCard, Page, LegacyTabs, SkeletonBodyText} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup';
import Appearance from './Display/Appearance';
import Restriction from './Triggers/Restriction';
import defaultSettings from '../../helpers/defaultSettings';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);

  const {data: valueSetting, handleChangeInput, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });

  const {editing, handleEdit: handleSaveSettings} = useEditApi({
    url: '/settings'
  });

  const items = {
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    productImage:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
  };

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      panelID: 'display',
      contentTab: <Appearance settings={valueSetting} handleChangeInput={handleChangeInput} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers',
      contentTab: <Restriction settings={valueSetting} handleChangeInput={handleChangeInput} />
    }
  ];

  if (loading)
    return (
      <Page title="Settings" fullWidth subtitle="Decide how your notifications will display">
        <Layout>
          <Layout.Section variant="oneThird">
            <LegacyCard sectioned>
              <SkeletonBodyText lines={5} />
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            <LegacyCard sectioned>
              <SkeletonBodyText lines={10} />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    );

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'Save',
        onAction: () => {
          handleSaveSettings(valueSetting);
        },
        loading: editing
      }}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup
            city={items.city}
            country={items.country}
            firstName={items.firstName}
            productImage={items.productImage}
            productName={items.productName}
            settings={valueSetting}
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
