$ErrorActionPreference = "SilentlyContinue"
$cmd = "serve -s build -l 3000"
$proc = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\workspace\internship-evaluation-system\client'; $cmd" -PassThru -WindowStyle Normal
Write-Host "Started process ID: $($proc.Id)"