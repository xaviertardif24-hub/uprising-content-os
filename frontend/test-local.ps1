# test-local.ps1
# This script runs the frontend tests on localhost.

Write-Host "Starting frontend tests on localhost..." -ForegroundColor Cyan

# Change directory to the frontend folder
cd "$PSScriptRoot"

# Run the playwright tests
npm run test

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nTests passed successfully!" -ForegroundColor Green
} else {
    Write-Host "`nTests failed!" -ForegroundColor Red
}

Write-Host "`nPress any key to exit..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
