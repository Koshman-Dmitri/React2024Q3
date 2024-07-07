type ValueOf<T> = T[keyof T];

export type LSKEY = {
  prevSearch_KD: string;
};

export type LSValue = ValueOf<LSKEY>;
