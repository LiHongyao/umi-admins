/*
 * @Author: Lee
 * @Date: 2023-02-21 01:09:24
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-10 22:19:10
 * @Description:
 */
import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Basic from './components/Basic';
import Categories from './components/Categories';
import Types from './components/Types';
import styles from './index.less';

const menuMap = {
  base: '基础配置',
  categories: '装备类型',
  types: '车辆类型',
};

type SettingsStateKeys = keyof typeof menuMap;
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const Settings: React.FC = () => {
  // -- state
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  // -- refs
  const dom = useRef<HTMLDivElement>();

  // -- methods
  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  // -- effects
  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () =>
    Object.keys(menuMap).map((item) => ({ key: item, label: menuMap[item as SettingsStateKeys] }));

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <Basic />;
      case 'categories':
        return <Categories />;
      case 'types':
        return <Types />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            items={getMenu()}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
          />
        </div>
        <div className={styles.right}>
          {/* <div className={styles.title}>{menuMap[initConfig.selectKey]}</div> */}
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};
export default Settings;
