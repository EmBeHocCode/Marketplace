const fs = require("node:fs");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

const workspace = process.cwd();
const nextBin = require.resolve("next/dist/bin/next");
const prismaBin = require.resolve("prisma/build/index.js");
const ports = [3000, 3001, 3002, 5555];
let nextChild = null;
let studioChild = null;

function runPowerShell(script) {
  return spawnSync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
    {
      cwd: workspace,
      encoding: "utf8"
    }
  );
}

function stopListeningPorts() {
  const result = runPowerShell(`
    $ports = @(${ports.join(",")})
    $processIds = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
      Where-Object { $ports -contains $_.LocalPort } |
      Select-Object -ExpandProperty OwningProcess -Unique
    if ($processIds) {
      Stop-Process -Id $processIds -Force -ErrorAction SilentlyContinue
      $processIds -join ","
    }
  `);

  if (result.stdout.trim()) {
    console.log(`[dev-single-instance] Da dung process giu port: ${result.stdout.trim()}`);
  }
}

function stopWorkspaceNextProcesses() {
  const escapedWorkspace = workspace.replace(/\\/g, "\\\\");
  const result = runPowerShell(`
    $workspace = "${escapedWorkspace}"
    $processIds = Get-CimInstance Win32_Process |
      Where-Object {
        $_.Name -eq "node.exe" -and
        $_.CommandLine -like "*$workspace*" -and
        (
          $_.CommandLine -like "*next\\\\dist\\\\bin\\\\next*" -or
          $_.CommandLine -like "*next\\\\dist\\\\server\\\\lib\\\\start-server.js*"
        )
      } |
      Select-Object -ExpandProperty ProcessId -Unique
    if ($processIds) {
      Stop-Process -Id $processIds -Force -ErrorAction SilentlyContinue
      $processIds -join ","
    }
  `);

  if (result.stdout.trim()) {
    console.log(
      `[dev-single-instance] Da dung Next process cua project: ${result.stdout.trim()}`
    );
  }
}

function stopWorkspacePrismaStudioProcesses() {
  const escapedWorkspace = workspace.replace(/\\/g, "\\\\");
  const result = runPowerShell(`
    $workspace = "${escapedWorkspace}"
    $processIds = Get-CimInstance Win32_Process |
      Where-Object {
        $_.Name -eq "node.exe" -and
        $_.CommandLine -like "*$workspace*" -and
        $_.CommandLine -like "*prisma*" -and
        $_.CommandLine -like "* studio*"
      } |
      Select-Object -ExpandProperty ProcessId -Unique
    if ($processIds) {
      Stop-Process -Id $processIds -Force -ErrorAction SilentlyContinue
      $processIds -join ","
    }
  `);

  if (result.stdout.trim()) {
    console.log(
      `[dev-single-instance] Da dung Prisma Studio process cua project: ${result.stdout.trim()}`
    );
  }
}

function removeNextCache() {
  const nextDir = path.join(workspace, ".next");
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("[dev-single-instance] Da xoa cache .next");
  }
}

function startPrismaStudio() {
  console.log("[dev-single-instance] Khoi dong Prisma Studio tai http://127.0.0.1:5555");

  studioChild = spawn(process.execPath, [prismaBin, "studio", "--port", "5555"], {
    cwd: workspace,
    stdio: "ignore",
    env: process.env
  });

  studioChild.on("exit", (code) => {
    if (code && code !== 0) {
      console.log(`[dev-single-instance] Prisma Studio da dung voi ma: ${code}`);
    }
  });
}

function startDevServer() {
  console.log("[dev-single-instance] Khoi dong MeowMarket tai http://localhost:3000");
  console.log("[dev-single-instance] Khi sua code, Next.js se tu hot reload, khong can chay lai.");

  nextChild = spawn(process.execPath, [nextBin, "dev", "-p", "3000"], {
    cwd: workspace,
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: "3000"
    }
  });

  nextChild.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

function cleanup() {
  if (studioChild && !studioChild.killed) {
    studioChild.kill("SIGTERM");
  }

  if (nextChild && !nextChild.killed) {
    nextChild.kill("SIGTERM");
  }
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", cleanup);

stopWorkspaceNextProcesses();
stopWorkspacePrismaStudioProcesses();
stopListeningPorts();
removeNextCache();
startPrismaStudio();
startDevServer();
