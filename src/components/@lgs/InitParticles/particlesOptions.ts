import type { ISourceOptions } from 'tsparticles-engine';

export const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: '#EDF0F3',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'bubble',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.5,
        size: 18,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 5,
      },
    },
  },
  particles: {
    color: {
      value: '#87CEFA',
    },
    links: {
      color: '#87CEFA',
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 20,
    },
    opacity: {
      value: 0.75,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};
