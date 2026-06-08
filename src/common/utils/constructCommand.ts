export function constructCommand({ command, runtimeArgs }) {
  const flagsAndSubCommands = runtimeArgs?.join(' ') || '';

  const commandString = `${command} ${flagsAndSubCommands}`;

  return commandString;
}
