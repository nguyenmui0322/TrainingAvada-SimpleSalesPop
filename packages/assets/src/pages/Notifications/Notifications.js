import {
  BlockStack,
  Card,
  LegacyStack,
  Page,
  ResourceItem,
  ResourceList,
  Text
} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import moment from 'moment';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const {data: items, loading} = useFetchApi({url: '/notifications'});

  const {data: valueSetting} = useFetchApi({url: '/settings'});

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const sortOptions = [
    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
  ];

  const renderItem = item => {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;

    return (
      <ResourceItem id={id}>
        <LegacyStack>
          <LegacyStack.Item fill>
            <NotificationPopup
              key={id}
              city={city}
              country={country}
              firstName={firstName}
              productImage={productImage}
              productName={productName}
              timestamp={timestamp}
              settings={valueSetting}
            />
          </LegacyStack.Item>
          <BlockStack inlineAlign="end">
            <Text>From {moment(timestamp).format('MMM DD')},</Text>
            <Text>{moment(timestamp).format('YYYY')}</Text>
          </BlockStack>
        </LegacyStack>
      </ResourceItem>
    );
  };

  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify" fullWidth>
      <Card>
        <ResourceList
          loading={loading}
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedProducts}
          onSelectionChange={setSelectedProducts}
          sortOptions={sortOptions}
          sortValue={sortValue}
          onSortChange={selected => {
            setSortValue(selected);
          }}
          pagination={{
            hasNext: true,
            hasPrevious: true,
            onNext: () => {}
          }}
          selectable
        />
      </Card>
    </Page>
  );
}
