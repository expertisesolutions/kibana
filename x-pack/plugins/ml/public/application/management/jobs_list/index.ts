/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { CoreSetup, CoreStart } from 'kibana/public';
import type { DataPublicPluginStart } from 'src/plugins/data/public';
import { ManagementAppMountParams } from '../../../../../../../src/plugins/management/public/';
import { MlStartDependencies } from '../../../plugin';
import { JobsListPage } from './components';
import { getJobsListBreadcrumbs } from '../breadcrumbs';
import { setDependencyCache, clearCache } from '../../util/dependency_cache';
import './_index.scss';
import { SharePluginStart } from '../../../../../../../src/plugins/share/public';
import { SpacesPluginStart } from '../../../../../spaces/public';

const renderApp = (
  element: HTMLElement,
  history: ManagementAppMountParams['history'],
  coreStart: CoreStart,
  share: SharePluginStart,
  data: DataPublicPluginStart,
  spacesApi?: SpacesPluginStart
) => {
  ReactDOM.render(
    React.createElement(JobsListPage, { coreStart, history, share, data, spacesApi }),
    element
  );
  return () => {
    unmountComponentAtNode(element);
    clearCache();
  };
};

export async function mountApp(
  core: CoreSetup<MlStartDependencies>,
  params: ManagementAppMountParams
) {
  const [coreStart, pluginsStart] = await core.getStartServices();

  setDependencyCache({
    docLinks: coreStart.docLinks!,
    basePath: coreStart.http.basePath,
    http: coreStart.http,
    i18n: coreStart.i18n,
  });

  params.setBreadcrumbs(getJobsListBreadcrumbs());
  return renderApp(
    params.element,
    params.history,
    coreStart,
    pluginsStart.share,
    pluginsStart.data,
    pluginsStart.spaces
  );
}
