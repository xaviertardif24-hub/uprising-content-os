$paths = @(
    "C:\Users\xavie\AppData\Local\Programs\Python\Python312\python.exe",
    "python",
    "py",
    "python3",
    "C:\Users\xavie\AppData\Local\Microsoft\WindowsApps\python.exe"
)

$started = $false
foreach ($p in $paths) {
    try {
        if (Get-Command $p -ErrorAction SilentlyContinue) {
            Write-Host "--- Python détecté : $p ---" -ForegroundColor Green
            
            # Vérification des dépendances
            Write-Host "Vérification des dépendances..." -ForegroundColor Cyan
            & $p -m pip install -r requirements.txt
            
            Write-Host "Lancement de l'Assistant Royal AI..." -ForegroundColor Cyan
            & $p -m uvicorn app.main:app --reload --port 8000 --host 127.0.0.1
            $started = $true
            break
        }
    } catch {}
}

if (-not $started) {
    Write-Host "ERREUR : Aucune installation de Python n'a été trouvée." -ForegroundColor Red
    Write-Host "Veuillez installer Python (https://www.python.org/) ou l'activer dans le Microsoft Store."
    Pause
}
