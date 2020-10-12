import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import PageListIcon from './Icons/PageListIcon';

import { withUnstatedContainers } from './UnstatedUtils';

import AppContainer from '../services/AppContainer';
import PageContainer from '../services/PageContainer';
import CustomNavigation from './CustomNavigation';


const TrashPage = (props) => {
  const { t } = props;

  const navTabMapping = {
    pagelist: {
      icon: <PageListIcon />,
      i18n: t('page_list'),
      // [TODO: show trash page list by gw4064]
      tabContent: t('Trash page list'),
      index: 0,
    },
  };

  return (
    <div className="grw-trash-page mt-5">
      <CustomNavigation navTabMapping={navTabMapping} />
    </div>
  );
};

const PageListWrapper = withUnstatedContainers(TrashPage, [AppContainer, PageContainer]);


TrashPage.propTypes = {
  t: PropTypes.func.isRequired, //  i18next
  appContainer: PropTypes.instanceOf(AppContainer),
  pageContainer: PropTypes.instanceOf(PageContainer),
};

export default withTranslation()(PageListWrapper);
