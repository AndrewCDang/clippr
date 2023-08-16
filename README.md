<!-- -------------- -->
Required Installation

Install Git and Node onto your pc/mac

Git
https://git-scm.com/download/mac

Node.js (Allows you to execute JavaScript code outside a web browser/ npm commands)
https://nodejs.org/en/download

<!-- ------------- -->
Clone repository

1.Navigate to the Directory (where you will save the repo)
Run: 
    cd path/to/my_project

('cd' is telling the terminal to go into the file)

2.Clone repo
run:
    git clone https://github.com/AndrewCDang/clippr.git

3. Enter your git username/password

4.Pull repository (run this command to get latest master branch)
run:
    git pull 

<!--  -->
Run dummy database
1.Install (globally) this package. You only need to do this once.
run:
    npm install json-server -g

2. run this command and point it towards the db.json file, within the data folder of the client folder:
    json-server --watch --port 4000 ./data/db.json
(replace path location as required)

<!-- --------- -->
Running App
'cd' into client folder, make sure your terminal is inside the client folder which contains package.json file. This file has all the dependencies listed, these are libraries found on https://www.npmjs.com/.

1. Install dependencies
run:
    npm install

2. Run development client server
run:
    npm run dev

Go to browser, app will be found on 'http://localhost:3000/'

