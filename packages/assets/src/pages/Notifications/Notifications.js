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
import usePaginate from '../../hooks/api/usePaginate';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('createdAt:desc');

  const {data: items, loading, prevPage, nextPage, pageInfo, onQueryChange} = usePaginate({
    url: '/notifications',
    defaultLimit: 10,
    defaultSort: 'createdAt:desc'
  });

  const {data: valueSetting} = useFetchApi({url: '/settings'});

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const sortOptions = [
    {label: 'Newest update', value: 'createdAt:desc'},
    {label: 'Oldest update', value: 'createdAt:asc'}
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
            onQueryChange('sort', selected, true);
          }}
          pagination={{
            hasPrevious: pageInfo.hasPre,
            onPrevious: prevPage,
            hasNext: pageInfo.hasNext,
            onNext: nextPage
          }}
          selectable
        />
      </Card>
    </Page>
  );
}
