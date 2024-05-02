import {Card, LegacyStack, Page, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const items = [
    {
      id: '1',
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      productImage:
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '2',
      firstName: 'John Doe 2',
      city: 'New York 2',
      country: 'United States 2',
      productName: 'Puffer Jacket With Hidden Hood 2',
      productImage:
        'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: () => {}
    }
  ];

  const sortOptions = [
    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
  ];

  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify" fullWidth>
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedProducts}
          promotedBulkActions={promotedBulkActions}
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

function renderItem(item) {
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
          />
        </LegacyStack.Item>
        <Text>From March 8, 2021</Text>
      </LegacyStack>
    </ResourceItem>
  );
}
