type EmptyText = {
  text: '';
};

export type AudioElement = {
  type: 'audio';
  src: string;
  width?: string;
  height?: string;
  children: EmptyText[];
};
