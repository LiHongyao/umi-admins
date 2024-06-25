import {
  MoveDirection,
  OutMode,
  type ISourceOptions,
} from '@tsparticles/engine';

export const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: '#edf0f3',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 60,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#0d47a1',
    },
    links: {
      color: '#0d47a1',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 120,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
