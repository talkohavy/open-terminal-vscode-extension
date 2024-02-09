import * as yup from 'yup';

const openTerminalConfigSchema = yup.object({
  command: yup.string().required(),
  name: yup.string(),
  color: yup.string(),
  runtimeArgs: yup.array().of(yup.string()),
  autoFocus: yup.boolean(),
  // .optional(),.nullable(),
});

const debugLaunchConfigSchema = yup.object({
  name: yup.string().trim(),
  request: yup.string().trim().required(),
  type: yup.string(),
  cwd: yup.string(),
  runtimeExecutable: yup.string(),
  runtimeArgs: yup.array().of(yup.string()),
  program: yup.string(),
  restart: yup.boolean(),
  outputCapture: yup.string(), // <--- options are: 'std' ...
  sourceMaps: yup.boolean(),
  env: yup.object(),
  // .optional(),.nullable(),
});

export { debugLaunchConfigSchema, openTerminalConfigSchema };
