export const Commands = {
  OpenTerminal: '',
  DebugTerminal: 'debug',
  JsDebugTerminal: 'js-debug',
} as const;

export type CommandValues = (typeof Commands)[keyof typeof Commands];

export type LaunchConfig = {
  type: string;
  name?: string;
  request?: string;
  cwd?: string;
  runtimeExecutable?: string;
  runtimeArgs?: string[];
  program?: string;
  restart?: boolean;
  outputCapture?: string;
  sourceMaps?: boolean;
  env: any;
};

export type TerminalConfig = {
  command: string;
  name?: string;
  color?: string;
  runtimeArgs?: string[];
  autoFocus?: boolean;
};
