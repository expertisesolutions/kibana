/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
export {
  AGENT_TYPE_PERMANENT,
  AGENT_TYPE_EPHEMERAL,
  AGENT_TYPE_TEMPORARY,
  AGENT_POLLING_THRESHOLD_MS,
  AGENT_POLLING_REQUEST_TIMEOUT_MARGIN_MS,
  AGENT_POLLING_INTERVAL,
  AGENT_UPDATE_LAST_CHECKIN_INTERVAL_MS,
  AGENT_POLICY_ROLLOUT_RATE_LIMIT_REQUEST_PER_INTERVAL,
  AGENT_POLICY_ROLLOUT_RATE_LIMIT_INTERVAL_MS,
  AGENT_UPDATE_ACTIONS_INTERVAL_MS,
  MAX_TIME_COMPLETE_INSTALL,
  // Routes
  LIMITED_CONCURRENCY_ROUTE_TAG,
  PLUGIN_ID,
  EPM_API_ROUTES,
  DATA_STREAM_API_ROUTES,
  PACKAGE_POLICY_API_ROUTES,
  AGENT_API_ROUTES,
  AGENT_API_ROUTES_7_9,
  AGENT_POLICY_API_ROUTES,
  AGENTS_SETUP_API_ROUTES,
  ENROLLMENT_API_KEY_ROUTES,
  INSTALL_SCRIPT_API_ROUTES,
  OUTPUT_API_ROUTES,
  SETUP_API_ROUTE,
  SETTINGS_API_ROUTES,
  APP_API_ROUTES,
  // Saved object types
  SO_SEARCH_LIMIT,
  AGENT_SAVED_OBJECT_TYPE,
  AGENT_EVENT_SAVED_OBJECT_TYPE,
  AGENT_ACTION_SAVED_OBJECT_TYPE,
  AGENT_POLICY_SAVED_OBJECT_TYPE,
  PACKAGE_POLICY_SAVED_OBJECT_TYPE,
  OUTPUT_SAVED_OBJECT_TYPE,
  PACKAGES_SAVED_OBJECT_TYPE,
  INDEX_PATTERN_SAVED_OBJECT_TYPE,
  ENROLLMENT_API_KEYS_SAVED_OBJECT_TYPE,
  GLOBAL_SETTINGS_SAVED_OBJECT_TYPE,
  // Defaults
  DEFAULT_AGENT_POLICY,
  DEFAULT_OUTPUT,
} from '../../common';
