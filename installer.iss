[Setup]
AppName=Student Database
AppVerName=Student Database 1.0
AppPublisher=Student Database
DefaultDirName={pf}\Student Database
DefaultGroupName=Student Database
DisableProgramGroupPage=yes
OutputDir={src}
OutputBaseFilename=StudentDatabaseInstaller
Compression=lzma
SolidCompression=yes
Uninstallable=yes
DisableDirPage=no
DisableWelcomePage=no
DisableFinishedPage=no

[Files]
Source: "{src}\index.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "{src}\styles.css"; DestDir: "{app}"; Flags: ignoreversion
Source: "{src}\script.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "{src}\README.md"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Student Database"; Filename: "{app}\index.html"
Name: "{userdesktop}\Student Database"; Filename: "{app}\index.html"

[Run]
Filename: "{app}\index.html"; Description: "Launch Student Database"; Flags: nowait postinstall skipifsilent
