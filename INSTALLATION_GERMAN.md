# Installieren des Server-Eye Grafana Plugins

Das Server-Eye Grafana Plugin erlaubt die Visualisierung und Überwachung von Sensorwerten außerhalb des OCC.

Das Installieren des Plugins ist sehr einfach und beinhaltet nur drei Schritte: 
* Download des Plugins
* Verschieben der Installationsdateien in das Plugin-Verzeichnis von Grafana
* Erlauben von unsignierten Plugins in der Konfigurationsdatei

Diese Aufgaben können jeweils entweder von Hand im Desktop Interface ausgeführt werden oder per Kommandozeilenbefehl erledigt werden.

Nach dem Installieren muss der Grafana-Dienst neugestartet werden. 

## Download des Plugins

### Linux (und Unix-ähnliche Systeme)

* Per Befehl (lädt immer die neueste Version): 
```sh
curl --silent 'https://api.github.com/repos/Server-Eye/grafana-plugin/tags'\
    | grep '"tarball_url": *' -m 1\
    | grep -oP 'https:\/\/[^,"]*'\
    | xargs curl -sL --silent --output server-eye-data-source.tar.gz\
    && tar -xzf server-eye-data-source.tar.gz\
    && mv Server-Eye-grafana-plugin-*/dist ./server-eye-data-source\
    && rm -rf Server-Eye-grafana-plugin-* server-eye-data-source.tar.gz
```

Alternativ bieten wir jetzt auch das Download-Script an, dass eine Auswahl der Version erlaubt (Anders als der obige Befehl setzt es die bash shell vorraus, alternativ kann auch zsh verwendet werden). Es kann einfach mit folgendem Befehl gestartet werden:

```bash
bash -c "curl -fsSL https://raw.githubusercontent.com/Server-Eye/grafana-plugin/master/download.sh)"
```

* Von Hand:

Rufe im Webbrowser die [Releases-Seite des Repositories](https://github.com/Server-Eye/grafana-plugin/releases) auf. Suche die neueste/gewünschte Version aus und lade den Source Code im bevorzugten Komprimierungsformat runter (.zip oder .tar.gz).
Dekomprimiere das heruntergeladene Verzeichnis und navigiere hinein. Darin befindet sich ein Ordner mit dem Namen `Server-Eye-grafana-plugin-`, der in einer siebenstelligen Hexadezimalzahl (Commit-Hash) endet. Navigiere in diesen hinein, und benenne den Ordner `dist` zu `server-eye-data-source` um.

### Windows

* Per Befehl (lädt immer die neueste Version; benötigt PowerShell >=5.1):

```powershell
Invoke-WebRequest -URI ((Invoke-WebRequest -URI https://api.github.com/repos/Server-Eye/grafana-plugin/tags | ConvertFrom-Json)[0].zipball_url) -OutFile server-eye-data-source.zip
Expand-Archive -Path server-eye-data-source.zip -DestinationPath .\server-eye-data-source-temp
Move-Item -Path server-eye-data-source-temp\Server-Eye-grafana-plugin-*\dist -Destination .\server-eye-data-source
Remove-Item -r .\server-eye-data-source-temp
Remove-Item server-eye-data-source.zip
```

* Von Hand:

Rufe im Webbrowser die [Releases-Seite des Repositories](https://github.com/Server-Eye/grafana-plugin/releases) auf. Suche die neueste/gewünschte Version aus und lade den Source Code im bevorzugten Komprimierungsformat runter (.zip oder .tar.gz).
Dekomprimiere das heruntergeladene Verzeichnis und navigiere hinein. Darin befindet ein Ordner mit dem Namen `Server-Eye-grafana-plugin-`, der in einer siebenstelligen Hexadezimalzahl (Commit-Hash) endet. Navigiere in diesen hinein, und benenne den Ordner `dist` zu `server-eye-data-source` um.

## Verschieben der Installationsdateien in das Plugin-Verzeichnis von Grafana

### Linux (und Unix-änliche Systeme)

* Per Befehl:

Dieser Befehl sollte (bei Bedarf) mit super user Berechtigungen ausgeführt werden.

```sh
mv server-eye-data-source /var/lib/grafana/plugins/
```

* Von Hand:

Kopiere den umbenannten Ordner in den Plugin-Ordner ihrer Grafana-Installation. Der standardmäßige Pfad unter Linux und Unix-ähnlichen Systemen ist hier `/var/lib/grafana/plugins`.

### Windows
* Per Befehl (benötigt PowerShell >=5.1):

Dieser Befehl muss auf jeden Fall in einer PowerShell mit Administratorberechtigungen ausgeführt werden.

```powershell
Move-Item -Path server-eye-data-source -Destination 'C:\Program Files\GrafanaLabs\grafana\data\plugins'
```

* Von Hand:

Kopiere den umbenannten Ordner in den Plugin-Ordner ihrer Grafana-Installation. Der standardmäßige Pfad unter Linux und Unix-ähnlichen Systemen ist hier `C:\Program Files\GrafanaLabs\grafana\data\plugins`.

## Anpassen der Konfigurationsdatei

### Alle Platformen

Anschließend muss die Datei `grafana.ini` dahingehend editiert werden, dass sie eine `[plugins]`-Sektion enthält. In dies muss über das `allow_loading_unsigned_plugins`-Attribut das `server-eye-grafana-plugin` in einer kommaseparierten Liste aufgeführt werden as per [Grafana-Doku](https://grafana.com/docs/grafana/latest/administration/configuration/#allow_loading_unsigned_plugins).
An dieser Stelle möchten wir erwähnen, dass dies nötig ist, da Grafana der Signaturprozess für Plugins außerhalb unserer Kontrolle liegt. Grafana selbst vertreibt immer noch einige Plugins, die ebenfalls über diesen Umweg aktiviert werden müssen ("Grafana Image Renderer" und "worldPing").
