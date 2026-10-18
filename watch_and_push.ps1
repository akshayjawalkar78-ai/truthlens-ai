# Watcher script to auto‑commit and push any changes every minute
while ($true) {
    try {
        . "$PSScriptRoot\auto_commit_push.ps1"
    } catch {
        Write-Host "Error running auto_commit_push: $_"
    }
    Start-Sleep -Seconds 60
}
