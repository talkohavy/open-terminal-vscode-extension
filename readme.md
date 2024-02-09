# Open Terminal Programmatically

<div align="center">
  <img src="https://i.ibb.co/vmXG1vL/terminalos.png" width="128" alt="Main Logo">
</div>

<br/>

Open VsCode terminal programmatically in the simplest way possible.  
Launch VsCode's debugger programmatically, passing your configuration to it.

![File](assets/open.in-terminal-example.gif)

## 1. Motivation

Honestly? Opening a terminal internally & programmatically in vscode shouldn't be that difficult!  
This extension is **by far** the most intuitive one you'll ever encounter for the task at hand. You simply need to remember the command `open.in-terminal`, and that's it! Can you handle that? Good! because the rest is fairly simple.

Consider a _use-case_ where you want to **execute multiple commands**, and have each command execute on a different terminal. You can name each terminal, and even provide a different color to each one. Using `open.in-terminal` you can achieve exactly that behavior.

This extension provides you with a step-by-step documentation, on all operating systems.

<br/>

## 2. Getting Started

### - A. Open a terminal programmatically

To make sure the extension works properly, run this small piece of code:  
_(depending on your operating system)_

#### **MacOS:**

```bash
open 'vscode://open.in-terminal?config={"command": "echo hello world"}'
```

#### **Windows:**

```bash
start vscode://open.in-terminal?config={"command": "echo hello world"}
```

#### **Linux:**

```bash
open 'vscode://open.in-terminal?config={"command": "echo hello world"}'
```

<br/>

### - B. Start a debug programmatically

Simply run this piece of code:  
(this will not work out-of-the-box! continue reading the [Usage section](#3-usage) below for more details...)

#### **MacOS:**

```bash
open 'vscode://open.in-terminal/debug?config={"type":"node","cwd":"${workspaceFolder}/apps/backend/","program":"src/index.js"}'
```

#### **Windows:**

```bash
start vscode://open.in-terminal/debug?config={"type":"node","cwd":"${workspaceFolder}/apps/backend/","program":"src/index.js"}
```

#### **Linux:**

```bash
open 'vscode://open.in-terminal/debug?config={"type":"node","cwd":"${workspaceFolder}/apps/backend/","program":"src/index.js"}'
```

<br/>

## 3. Options

### - A. Open a terminal programmatically

Here is a list of all options available inside the config:

• `name`

_*type*: `string`_  
_*default*: `undefined`_

The display name (nickname) of the terminal.

<br/>

• `color`

_*type*: 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'black' | 'white'_  
_*default*: `undefined`_

The **color of the icon** of the terminal to be opened.

<br/>

• `command`

_*type*: `string`_  
_*default*: `undefined`_

The command to execute in the shell automatically once the terminal is open.

<br/>

• `runtimeArgs`

_*type*: `array<strings>`_  
_*default*: `undefined`_

<br/>

• `autoFocus`

_*type*: `boolean`_  
_*default*: `false`_

<br/>

### - B. Start a debug programmatically

Basically if you know how to set a `launch.json` in vscode, you know how to use `open.in-terminal/debug`. Just pass to the `config` query param whatever you would have passed to a normal vscode [launch configuration](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations).

Here is an example of a complex configuration:

```bash
open 'vscode://open.in-terminal/debug?config={"type":"node","request":"launch","cwd":"${workspaceFolder}/apps/backend/","runtimeExecutable":"${workspaceRoot}/node_modules/.bin/nodemon","runtimeArgs":["--config","${workspaceFolder}/apps/backend/nodemon.json"],"program":"src/index.js","restart":true,"outputCapture":"std","sourceMaps":true}'
```

<br/>

## 4. Encoded Commands

You might find yourself in a situation where your command contains special characters such that make the `open.in-terminal` command fail. In that case, we support an **encoded config** query param. To turn this feature on, you need 2 things:

- to encode your config (example below)
- add an `encoded` query param set to `true`

Here's an example:

```javascript
import { execSync } from 'child_process';

const programParams = { command: 'cd apps/backend && npm run dev' };

  const configAsString = JSON.stringify(programParams);

  const encodedConfig = btoa(encodeURIComponent(configAsString));

  execSync(`open 'vscode://open.in-terminal?config=${encodedConfig}&encoded=1'`);
```

In the example above, the command contains `&&`, which causes problems during the parsing stage. By encoding your command, and turning on the `encoded` flag, you can avoid that, and have your command be parsed successfully. You **HAVE** to use `btoa` & `encodeURIComponent` since i'm using their reverse counterparts on the other side!

<br/>

## 5. Demo

### - A. Code Demo (in Node)

```javascript
// filename: runAll.js

import { execSync } from 'child_process';

const programs = [
  {
    name: 'api-gateway',
    command: 'npm run start-api-gateway',
  },
  {
    name: 'users-service',
    command: 'npm run start-users-service',
  },
  {
    name: 'chat-service',
    command: 'npm run start-chat-service',
  },
  {
    name: 'frontend',
    command: 'npm run start-frontend',
  },
];

programs.forEach((program, index) => {
  const programParams = { ...program, color: 'blue', autoFocus: index === programs.length - 1 };

  execSync(`open 'vscode://open.in-terminal?config=${JSON.stringify(programParams)}'`);
});
```

<br/>

### - B. Video Demo (running the code above)

![File](assets/open.in-terminal-example.gif)

<br/>

## 6. Contributing

If you found a bug, or have a feature request, please open an [issue](https://github.com/talkohavy/open-terminal-vscode-extension/issues) about it.

## License

MIT © Tal Kohavy
