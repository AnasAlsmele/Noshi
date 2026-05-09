# Noshi Build Script
# Usage: ./build.ps1

Write-Host "Building Noshi v3..." -ForegroundColor Cyan

$files = @(
    "src/core/noshi-init.js",
    "src/core/noshi-styles.js",
    "src/core/noshi-ce.js",
    "src/core/noshi-icons.js",
    "src/core/noshi-core.js",
    "src/builder/noshi-builder.js",
    "src/components/elements.js",
    "src/components/data.js",
    "src/components/forms.js",
    "src/components/interactive.js",
    "src/components/layout.js",
    "src/components/visual.js"
)

$content = ""
foreach ($file in $files) {
    if (Test-Path $file) {
        $content += Get-Content $file -Raw -Encoding UTF8
        $content += "`n"
    } else {
        Write-Error "File not found: $file"
    }
}

$main = Get-Content "src/main.js" -Raw -Encoding UTF8
$final = $main.Replace("/* [INJECT_MODULES] */", $content)

# Save to root with clean UTF8
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$(Get-Location)/noshi.js", $final, $utf8NoBOM)
Write-Host "Saved to noshi.js" -ForegroundColor Green

# Sync to docs
Copy-Item "noshi.js" "docs/noshi/noshi.js" -Force
Write-Host "Synced to docs/noshi/noshi.js" -ForegroundColor Green

Write-Host "Build Complete!" -ForegroundColor Cyan
