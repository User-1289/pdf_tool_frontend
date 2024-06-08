export function getLocalProjects() {
    // Get the stored projects as a string and parse it to an array
    let getAllProjIds = JSON.parse(localStorage.getItem("projects") || "[]");
   // console.log(getAllProjIds);  // Should be an array

    let allProj = [];
    for (let i = 0; i < getAllProjIds.length; i++) {
        let getProjDetails = getIndividualProj(getAllProjIds[i]);
       // console.log(getProjDetails);
        allProj.push(getProjDetails);
    }

    return allProj;
}

function getIndividualProj(projId) {
    return JSON.parse(localStorage.getItem(projId))
}

export function deleteLocalProjects(){
    let getAllProjIds = JSON.parse(localStorage.getItem("projects") || "[]");
    for (let i = 0; i < getAllProjIds.length; i++) {
        localStorage.removeItem(getAllProjIds[i])
    }
    localStorage.removeItem("projects")
}