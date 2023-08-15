
// Simulating database 
// Install json-server 'npm install json-server -g'
// run command in terminal to simulate server in local host - referencing JSON file
// 'json-server --watch --port 4000 <path name to db.json>
async function getBarbers(){
    const res = await fetch('http://localhost:4000/barbers')
    return res.json()
}
