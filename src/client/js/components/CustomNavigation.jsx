import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { withUnstatedContainers } from './UnstatedUtils';
import PageAccessoriesContainer from '../services/PageAccessoriesContainer';

const CustomNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('');
  const [activeComponents, setActiveComponents] = useState(new Set(['']));
  // [TODO: set default active tab by gw4079]
  const [sliderWidth, setSliderWidth] = useState(null);
  const [sliderMarginLeft, setSliderMarginLeft] = useState(null);

  // Might make this dynamic for px, %, pt, em
  function getPercentage(min, max) {
    return min / max * 100;
  }

  useEffect(() => {
    if (activeTab === '') {
      return;
    }

    const navBar = document.getElementById('grw-custom-navbar');
    const navTabs = document.querySelectorAll('ul.grw-custom-navbar > li.grw-custom-navtab');

    if (navBar == null || navTabs == null) {
      return;
    }

    let tempML = 0;

    const styles = [].map.call(navTabs, (el) => {
      const width = getPercentage(el.offsetWidth, navBar.offsetWidth);
      const marginLeft = tempML;
      tempML += width;
      return { width, marginLeft };
    });
    const { width, marginLeft } = styles[props.navTabMapping[activeTab].index];

    setSliderWidth(width);
    setSliderMarginLeft(marginLeft);

  }, [activeTab]);


  function renderNomalCustomNavigation() {
    function switchActiveTab(activeTab) {
      setActiveTab(activeTab);
    }
    return (
      <>
        <Nav className="nav-title grw-custom-navbar" id="grw-custom-navbar">
          {Object.entries(props.navTabMapping).map(([key, value]) => {
            return (
              <NavItem key={key} type="button" className={`p-0 grw-custom-navtab ${activeTab === key && 'active'}`}>
                <NavLink onClick={() => { switchActiveTab(key) }}>
                  {value.icon}
                  {value.i18n}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <hr className="my-0 grw-nav-slide-hr border-none" style={{ width: `${sliderWidth}%`, marginLeft: `${sliderMarginLeft}%` }} />
        <TabContent activeTab={activeTab} className="p-5">
          {Object.entries(props.navTabMapping).map(([key, value]) => {
            return (
              <TabPane key={key} tabId={key}>
                {value.tabContent}
              </TabPane>
            );
          })}
        </TabContent>
      </>
    );
  }

  function closeModalHandler() {
    if (props.onClose == null) {
      return;
    }
    props.onClose();
  }

  function renderModalCustomNavigation() {
    const { pageAccessoriesContainer } = props;
    const { switchActiveTab } = pageAccessoriesContainer;
    const { activeTab } = pageAccessoriesContainer.state;
    console.log([...activeComponents, activeTab]);
    return (
      <>
        <Modal size="xl" isOpen={props.isOpen} toggle={closeModalHandler} className="grw-page-accessories-modal">
          <ModalHeader className="p-0" toggle={closeModalHandler}>
            <Nav className="nav-title" id="nav-title">
              {Object.entries(props.navTabMapping).map(([key, value]) => {
              return (
                <NavItem key={key} type="button" className={`p-0 nav-link ${activeTab === key && 'active'}`}>
                  <NavLink onClick={() => { switchActiveTab(key) }}>
                    {value.icon}
                    {value.i18n}
                  </NavLink>
                </NavItem>
              );
            })}
            </Nav>
            <hr className="my-0 grw-nav-slide-hr border-none" style={{ width: `${sliderWidth}%`, marginLeft: `${sliderMarginLeft}%` }} />
          </ModalHeader>
          <ModalBody className="overflow-auto grw-modal-body-style p-0">

            <TabContent activeTab={activeTab} className="p-5">
              {Object.entries(props.navTabMapping).map(([key, value]) => {
                return (
                  <TabPane tabId={key}>
                    {activeComponents.has(key) && value.tabContent}
                  </TabPane>
                );
              })}
            </TabContent>
          </ModalBody>
        </Modal>
      </>
    );

  }


  return (
    <>
      {/* {renderNomalCustomNavigation()} */}
      {renderModalCustomNavigation()}
    </>
  );
};

const CustomNavigationWrapper = withUnstatedContainers(CustomNavigation, [PageAccessoriesContainer]);

CustomNavigation.propTypes = {
  pageAccessoriesContainer: PropTypes.instanceOf(PageAccessoriesContainer).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  navTabMapping: PropTypes.object,
};

export default CustomNavigationWrapper;
