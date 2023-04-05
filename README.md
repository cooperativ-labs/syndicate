# Permissioned Exchange

# ECONNREFUSED error
Dgraph does a horribly annoying thing where it wont use the DNS name of the server, but instead uses the IP address. This is a problem when you are using docker-compose and you want to use the service name as the hostname. 

Get the Container ID of the Dgraph server (alpha): 

    docker ps

Find the IP address of the container: 

    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container id>

Edit `next-auth.ts` the hostname to the IP address. (line 18)



# Packages
https://www.oracle.com/java/technologies/downloads/
How to set up Firebase Emulator: https://firebase.google.com/docs/emulator-suite/install_and_configure