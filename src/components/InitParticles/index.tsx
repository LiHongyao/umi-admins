// → 安装依赖：pnpm i  react-tsparticles tsparticles-engine tsparticles-slim

import React, { memo, useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import styles from './index.less';
import { particlesOptions } from './particlesOptions';

const InitParticles: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    [],
  );

  return (
    <Particles
      className={styles.tsparticles}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
  );
};

export default memo(InitParticles);
