/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { ReactWrapper } from 'enzyme';
import React from 'react';
import { getColumns } from './columns';
import { TestProviders } from '../../mock';
import { useMountAppended } from '../../utils/use_mount_appended';
import { mockBrowserFields } from '../../containers/source/mock';
import { EventFieldsData } from './types';

jest.mock('../../lib/kibana');
interface Column {
  field: string;
  name: string | JSX.Element;
  sortable: boolean;
  render: (field: string, data: EventFieldsData) => JSX.Element;
}

describe('getColumns', () => {
  const mount = useMountAppended();
  const defaultProps = {
    browserFields: mockBrowserFields,
    columnHeaders: [],
    contextId: 'some-context',
    eventId: 'some-event',
    getLinkValue: jest.fn(),
    onUpdateColumns: jest.fn(),
    timelineId: 'some-timeline',
    toggleColumn: jest.fn(),
  };

  test('should have expected fields', () => {
    const columns = getColumns(defaultProps);
    columns.forEach((column) => {
      expect(column).toHaveProperty('field');
      expect(column).toHaveProperty('name');
      expect(column).toHaveProperty('render');
      expect(column).toHaveProperty('sortable');
    });
  });

  describe('column actions', () => {
    let actionsColumn: Column;
    const mockDataToUse = mockBrowserFields.agent;
    const testValue = 'testValue';
    const testData = {
      type: 'someType',
      category: 'agent',
      field: 'agent.id',
      ...mockDataToUse,
    } as EventFieldsData;

    beforeEach(() => {
      actionsColumn = getColumns(defaultProps)[0] as Column;
    });

    describe('filter in', () => {
      test('it renders a filter for (+) button', () => {
        const wrapper = mount(
          <TestProviders>{actionsColumn.render(testValue, testData)}</TestProviders>
        ) as ReactWrapper;

        expect(wrapper.find('[data-test-subj="hover-actions-filter-for"]').exists()).toBeTruthy();
      });
    });

    describe('filter out', () => {
      test('it renders a filter out (-) button', () => {
        const wrapper = mount(
          <TestProviders>{actionsColumn.render(testValue, testData)}</TestProviders>
        ) as ReactWrapper;

        expect(wrapper.find('[data-test-subj="hover-actions-filter-out"]').exists()).toBeTruthy();
      });
    });

    describe('add to timeline', () => {
      test('it renders an add to timeline button', () => {
        const wrapper = mount(
          <TestProviders>{actionsColumn.render(testValue, testData)}</TestProviders>
        ) as ReactWrapper;

        expect(wrapper.find('[data-test-subj="hover-actions-add-timeline"]').exists()).toBeTruthy();
      });
    });

    describe('column toggle', () => {
      test('it renders a column toggle button', () => {
        const wrapper = mount(
          <TestProviders>{actionsColumn.render(testValue, testData)}</TestProviders>
        ) as ReactWrapper;

        expect(
          wrapper.find('[data-test-subj="hover-actions-toggle-column"]').exists()
        ).toBeTruthy();
      });
    });

    describe('copy', () => {
      test('it renders a copy button', () => {
        const wrapper = mount(
          <TestProviders>{actionsColumn.render(testValue, testData)}</TestProviders>
        ) as ReactWrapper;

        expect(wrapper.find('[data-test-subj="hover-actions-copy-button"]').exists()).toBeTruthy();
      });
    });
  });
});
