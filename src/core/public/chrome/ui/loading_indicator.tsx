/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiLoadingSpinner, EuiProgress } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import classNames from 'classnames';
import { Subscription } from 'rxjs';

import { HttpStart } from '../../http';

export interface LoadingIndicatorProps {
  loadingCount$: ReturnType<HttpStart['getLoadingCount$']>;
  showAsBar?: boolean;
}

export class LoadingIndicator extends React.Component<LoadingIndicatorProps, { visible: boolean }> {
  public static defaultProps = { showAsBar: false };

  private loadingCountSubscription?: Subscription;

  state = {
    visible: false,
  };

  private timer: any;
  private increment = 1;

  componentDidMount() {
    this.loadingCountSubscription = this.props.loadingCount$.subscribe((count) => {
      if (this.increment > 1) {
        clearTimeout(this.timer);
      }
      this.increment += this.increment;
      this.timer = setTimeout(() => {
        this.setState({
          visible: count > 0,
        });
      }, 250);
    });
  }

  componentWillUnmount() {
    if (this.loadingCountSubscription) {
      clearTimeout(this.timer);
      this.loadingCountSubscription.unsubscribe();
      this.loadingCountSubscription = undefined;
    }
  }

  render() {
    const className = classNames(!this.state.visible && 'kbnLoadingIndicator-hidden');

    const testSubj = this.state.visible
      ? 'globalLoadingIndicator'
      : 'globalLoadingIndicator-hidden';

    const ariaHidden = this.state.visible ? false : true;

    const ariaLabel = i18n.translate('core.ui.loadingIndicatorAriaLabel', {
      defaultMessage: 'Loading content',
    });

    const logo = this.state.visible ? (
      <EuiLoadingSpinner
        size="l"
        data-test-subj={testSubj}
        aria-hidden={false}
        aria-label={ariaLabel}
      />
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 8000 8000" className="euiIcon euiIcon--large chrHeaderLogo__cluster" >
        <g fill="none">
          <path
            fill="#25282f"
            d="M66.17,3998.49q0-1938.34-2.4-3876.7c-.22-81.41,20.34-92,95.4-91.94q3842.35,3.51,7684.72-.41c81.37-.09,92,20.29,91.94,95.35q-3.53,3876.71.4,7753.42c.09,81.39-20.3,92-95.35,91.94q-3842.37-3.51-7684.73.41c-81.38.09-92.13-20.29-92-95.36Q68.33,5936.86,66.17,3998.49ZM2977.09,329.12c-883,0-1732.61,1.21-2582.26-1.76-90.27-.32-73.23,52.58-73.23,103.57q-.15,3562.1-2,7124.19c-.09,89.11,21.35,114.19,112.74,114.08q3281.89-4.05,6563.79-.6c70.35,0,108.51-18,137.14-85.65,173.71-410.37,214.06-833,101.5-1262.69-149.23-569.6-536.33-932.95-1060.58-1163.18C5796.67,4991.29,5396.32,4895,4999.3,4790.2c-570.08-150.43-1138.36-305.41-1677.82-549.51C2070.9,3674.83,1775.05,2366,2126.41,1429.22,2292.44,986.57,2565.76,624.35,2977.09,329.12Zm4675,3872.73c1.87-31.36,3.4-45,3.4-58.63q.18-1863.91,2.32-3727.84c.23-88-40.45-87-103.29-86.94q-2006.83,1.35-4013.68.15c-47.11,0-87.74,8.41-128.37,35.39-640.11,425-777,1438.93-272.37,2022.22,275.68,318.65,642,482.45,1034.39,594.38,546.06,155.76,1109.68,230.11,1664.87,343.68,569.15,116.43,1108.62,300.68,1570.91,666.87C7489.29,4053.69,7562.56,4123.45,7652.13,4201.85Z"
          />
          <path
            fill="#FFF"
            d="M2977.09,329.12c-411.33,295.23-684.65,657.45-850.68,1100.1C1775.05,2366,2070.9,3674.83,3321.48,4240.69c539.46,244.1,1107.74,399.08,1677.82,549.51,397,104.76,797.37,201.09,1174.86,366.88,524.25,230.23,911.35,593.58,1060.58,1163.18C7347.3,6749.93,7307,7172.58,7133.24,7583c-28.63,67.66-66.79,85.7-137.14,85.65q-3281.9-2.76-6563.79.6c-91.39.11-112.83-25-112.74-114.08q3.66-3562.09,2-7124.19c0-51-17-103.89,73.23-103.57C1244.48,330.33,2094.13,329.12,2977.09,329.12Z"
          />
          <path
            fill="#FFF"
            d="M7652.13,4201.85c-89.57-78.4-162.84-148.16-241.82-210.72C6948,3624.94,6408.55,3440.69,5839.4,3324.26c-555.19-113.57-1118.81-187.92-1664.87-343.68-392.43-111.93-758.71-275.73-1034.39-594.38C2635.5,1802.91,2772.4,789,3412.51,364c40.63-27,81.26-35.42,128.37-35.39q2006.84,1,4013.68-.15c62.84-.05,103.52-1.07,103.29,86.94q-4.82,1863.92-2.32,3727.84C7655.53,4156.85,7654,4170.49,7652.13,4201.85Z"
          />
        </g>
      </svg>
    );

    return !this.props.showAsBar ? (
      logo
    ) : (
      <EuiProgress
        className={className}
        data-test-subj={testSubj}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        position="fixed"
        color="accent"
        size="xs"
      />
    );
  }
}
