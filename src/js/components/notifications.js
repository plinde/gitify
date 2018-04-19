import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import RepositoryNotifications from './repository';

export default class AccountNotifications extends React.Component {
  static propTypes = {
    hostname: PropTypes.string.isRequired,
    notifications: PropTypes.any.isRequired,
  };

  render() {
    const { hostname, notifications } = this.props;

    const groupedNotifications = notifications.groupBy(object =>
      object.getIn(['repository', 'full_name'])
    );

    console.log(notifications.size);
    
    console.log(notiications.className);
    // valueSeq.map(obj => obj.first().getIn(['repository', 'full_name'])));

    return (
      <ReactCSSTransitionGroup
        transitionName="repository"
        transitionEnter={false}
        transitionLeaveTimeout={325}
      >
        <div className="account p-2">
          {hostname}
          <span
            className={`octicon octicon-chevron-${notifications.isEmpty()
              ? 'left'
              : 'down'} ml-2`}
          />
        </div>

        {groupedNotifications.valueSeq().map(obj => {
          const repoSlug = obj.first().getIn(['repository', 'full_name']);
          return (
            <RepositoryNotifications
              hostname={hostname}
              repo={obj}
              repoName={repoSlug}
              key={repoSlug}
            />
          );
        })}
      </ReactCSSTransitionGroup>
    );
  }
}
