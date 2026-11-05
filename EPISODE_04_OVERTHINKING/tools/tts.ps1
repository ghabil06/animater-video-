param(
    [string]$TextFile,
    [string]$OutWav
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = -1
$text = Get-Content -Path $TextFile -Raw -Encoding UTF8
$synth.SetOutputToWaveFile($OutWav)
$synth.Speak($text)
$synth.Dispose()
Write-Host "TTS output written to $OutWav"

