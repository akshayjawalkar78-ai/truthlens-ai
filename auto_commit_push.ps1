# Auto-commit and push script for Antigravity generated code
$commitMessage = "Auto-update from Antigravity $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git add .
if (git diff-index --quiet HEAD --) {
    Write-Host "No changes to commit."
} else {
    git commit -m $commitMessage
    git push origin main
    Write-Host "Changes committed and pushed."
}
