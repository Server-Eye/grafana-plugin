# Installieren des Server-Eye Grafana Plugins

Das Server-Eye Grafana Plugin erlaubt die Visualisierung und Überwachung von Sensorwerten außerhalb des OCC.

Das Installieren des Plugins ist sehr einfach und beinhaltet nur zwei Schritte: 
* Download des Plugins
* Verschieben der Installationsdateien in das Plugin-Verzeichnis von Grafana

Beide dieser Aufgaben können jeweils entweder von Hand im Desktop Interface ausgeführt werden oder per Kommandozeilenbefehl erledigt werden.

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