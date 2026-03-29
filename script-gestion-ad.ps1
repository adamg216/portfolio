# ============================================
# Manage-ADUsers.ps1 — Gestion unifiee utilisateurs AD
# Projet Windows Server - Adam Ghazel - BUT R&T
# ============================================
# Usage: .\Manage-ADUsers.ps1 -Action <Create|Modify|Delete> [-WhatIf]

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [ValidateSet('Create','Modify','Delete')]
    [string]$Action,
    
    [string]$CsvPath = ".\users.csv",
    [string]$LogPath = "C:\Logs\AD-Users-$(Get-Date -Format 'yyyy-MM-dd').log"
)

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogPath -Value $entry
    Write-Verbose $entry
}

# Import users from CSV
$users = Import-Csv -Path $CsvPath -Delimiter ";"

foreach ($user in $users) {
    $sam = "$($user.Prenom.ToLower()).$($user.Nom.ToLower())"
    $ou = "OU=$($user.Service),DC=iut,DC=local"
    
    switch ($Action) {
        'Create' {
            if ($PSCmdlet.ShouldProcess($sam, "Create AD user in $ou")) {
                try {
                    New-ADUser -Name "$($user.Prenom) $($user.Nom)" `
                        -SamAccountName $sam `
                        -Path $ou `
                        -AccountPassword (ConvertTo-SecureString $user.Password -AsPlainText -Force) `
                        -Enabled $true
                    Write-Log "[+] User $sam created successfully"
                } catch {
                    Write-Log "[!] Error creating $sam : $_" -Level "ERROR"
                }
            }
        }
        'Delete' {
            if ($PSCmdlet.ShouldProcess($sam, "Delete AD user")) {
                Remove-ADUser -Identity $sam -Confirm:$false
                Write-Log "[-] User $sam deleted"
            }
        }
    }
}

Write-Log "=== Operation $Action completed ==="
