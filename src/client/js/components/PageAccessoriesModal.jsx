import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import PageListIcon from './Icons/PageListIcon';
import TimeLineIcon from './Icons/TimeLineIcon';
import RecentChangesIcon from './Icons/RecentChangesIcon';
import AttachmentIcon from './Icons/AttachmentIcon';
import ShareLinkIcon from './Icons/ShareLinkIcon';

import { withUnstatedContainers } from './UnstatedUtils';
import PageAccessoriesContainer from '../services/PageAccessoriesContainer';
import PageAttachment from './PageAttachment';
import PageTimeline from './PageTimeline';
import PageList from './PageList';
import PageHistory from './PageHistory';
import ShareLink from './ShareLink/ShareLink';

import CustomNavigation from './CustomNavigation';


const PageAccessoriesModal = (props) => {
  const { t, pageAccessoriesContainer } = props;

  const navTabMapping = {
    pagelist: {
      icon: <PageListIcon />,
      i18n: t('page_list'),
      tabContent: <PageList />,
      index: 0,
    },
    timeline:  {
      icon: <TimeLineIcon />,
      i18n: t('Timeline View'),
      tabContent: <PageTimeline />,
      index: 1,
    },
    pageHistory: {
      icon: <RecentChangesIcon />,
      i18n: t('History'),
      tabContent: <PageHistory />,
      index: 2,
    },
    attachment: {
      icon: <AttachmentIcon />,
      i18n: t('attachment_data'),
      tabContent: <PageAttachment />,
      index: 3,
    },
    shareLink: {
      icon: <ShareLinkIcon />,
      i18n: t('share_links.share_link_management'),
      tabContent: <ShareLink />,
      index: 4,
    },
  };


  return (
    <React.Fragment>
      <div className="grw-custom-navigation">
        <CustomNavigation navTabMapping={navTabMapping} isOpen={props.isOpen} onClose={props.onClose} />
      </div>
    </React.Fragment>
  );
};

/**
 * Wrapper component for using unstated
 */
const PageAccessoriesModalWrapper = withUnstatedContainers(PageAccessoriesModal, [PageAccessoriesContainer]);

PageAccessoriesModal.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  // pageContainer: PropTypes.instanceOf(PageContainer).isRequired,
  pageAccessoriesContainer: PropTypes.instanceOf(PageAccessoriesContainer).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default withTranslation()(PageAccessoriesModalWrapper);
