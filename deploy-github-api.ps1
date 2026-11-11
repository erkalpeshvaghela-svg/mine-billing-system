# ==============================================================================
# 1-CLICK GITHUB & GITHUB PAGES DEPLOYMENT SCRIPT (FleetTrack Pro)
# Works without needing Git installed on your computer!
# Uses official GitHub REST API (PowerShell native Invoke-RestMethod)
# ==============================================================================

param (
    [string]$GitHubToken = "",
    [string]$RepoName = "mining-fleet-ledger"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  FleetTrack Pro - Automatic GitHub Pages Deployer        " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $GitHubToken) {
    Write-Host "`nPlease enter your GitHub Personal Access Token (classic with 'repo' scope or fine-grained):" -ForegroundColor Green
    Write-Host "(You can create one at: https://github.com/settings/tokens/new with 'repo' checked)`n" -ForegroundColor Gray
    $GitHubToken = Read-Host "GitHub Token"
}

if (-not $GitHubToken) {
    Write-Host "❌ Token is required. Exiting." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $GitHubToken"
    "Accept"        = "application/vnd.github.v3+json"
    "User-Agent"    = "FleetTrackPro-Deployer"
}

# 1. Verify User
Write-Host "`n[1/5] Verifying GitHub user credentials..." -ForegroundColor Cyan
try {
    $userRes = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get
    $username = $userRes.login
    Write-Host "✅ Signed in as: $username ($($userRes.name))" -ForegroundColor Green
} catch {
    Write-Host "❌ Authentication failed! Check your token." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# 2. Create or find repo
Write-Host "`n[2/5] Creating GitHub repository '$RepoName'..." -ForegroundColor Cyan
$repoBody = @{
    name        = $RepoName
    description = "FleetTrack Pro - Mining Truck Fleet Haulage, Diesel Expenses & Weighment Slip OCR Ledger"
    private     = $false
    auto_init   = $true
} | ConvertTo-Json

try {
    $repoRes = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers -Method Post -Body $repoBody
    Write-Host "✅ Created new public repository: $($repoRes.html_url)" -ForegroundColor Green
} catch {
    Write-Host "ℹ️ Repository may already exist. Checking repository access..." -ForegroundColor Yellow
    try {
        $repoRes = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName" -Headers $headers -Method Get
        Write-Host "✅ Using existing repository: $($repoRes.html_url)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not access or create repository: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# 3. Upload files
$filesToUpload = @("index.html", "styles.css", "app.js", "db.js", "sample_weighment_slip.jpg", "README.md")
$baseDir = $PSScriptRoot

Write-Host "`n[3/5] Uploading web application files to branch 'main'..." -ForegroundColor Cyan

foreach ($file in $filesToUpload) {
    $filePath = Join-Path $baseDir $file
    if (-not (Test-Path $filePath)) { continue }

    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
    $b64Content = [Convert]::ToBase64String($fileBytes)

    # Check if file exists to get SHA for update
    $sha = $null
    try {
        $existing = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName/contents/$file" -Headers $headers -Method Get -ErrorAction SilentlyContinue
        $sha = $existing.sha
    } catch {}

    $uploadBody = @{
        message = "Deploy $file for live demo"
        content = $b64Content
    }
    if ($sha) { $uploadBody["sha"] = $sha }
    $jsonBody = $uploadBody | ConvertTo-Json

    try {
        $uploadRes = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName/contents/$file" -Headers $headers -Method Put -Body $jsonBody
        Write-Host "  • Uploaded $file successfully" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️ Error uploading $file : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 4. Enable GitHub Pages
Write-Host "`n[4/5] Enabling GitHub Pages (Serving from root / on branch main)..." -ForegroundColor Cyan
$pagesBody = @{
    source = @{
        branch = "main"
        path   = "/"
    }
} | ConvertTo-Json

try {
    $pagesRes = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName/pages" -Headers $headers -Method Post -Body $pagesBody
    Write-Host "✅ GitHub Pages activated successfully!" -ForegroundColor Green
} catch {
    # If already created, check status
    try {
        $pagesRes = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName/pages" -Headers $headers -Method Get
        Write-Host "✅ GitHub Pages is active." -ForegroundColor Green
    } catch {
        Write-Host "ℹ️ GitHub Pages queued for activation." -ForegroundColor Yellow
    }
}

# 5. Output Results
$liveDemoUrl = "https://$username.github.io/$RepoName/"
Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!                  " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "`n📁 GitHub Repository URL: $($repoRes.html_url)" -ForegroundColor White
Write-Host "🌐 Live GitHub Pages Demo: $liveDemoUrl" -ForegroundColor Cyan
Write-Host "`n(Note: GitHub Pages can take 1-2 minutes on first deploy to build and show the page)" -ForegroundColor Gray
Write-Host "You can share this live demo link directly with anyone!" -ForegroundColor Green
