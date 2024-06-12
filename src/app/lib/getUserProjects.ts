import {app} from '../components/configure'
import { getFirestore, doc, setDoc, addDoc, deleteDoc, collection,where,getDocs, query, updateDoc ,DocumentData} from "firebase/firestore";
const db = getFirestore(app);
interface ProjectRes {
    status:boolean,
    projects:any,
    error:any
}

interface ProjectDetailsStruc {
    projectId:string,
    projectExtracted:any[],
    projectName:string,
    
}
export async function getProjects(uid:string): Promise<ProjectRes> {
    try {
        const tasksQuery = query(collection(db, "projects"), where("uid", "==", uid));
        const querySnapshot = await getDocs(tasksQuery);
    
        const projects: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            projects.push(doc.data());
        });
    
        return {status:true, projects:projects, error:""}
      } catch (e) {
        console.error("Error getting tasks: ", e);
        return {status:false, projects:[], error:e};
      }
    }

export function saveAllProjectsLocally(projectsObj:any){
    let projIdArr = []
    projectsObj.map((proj,i)=>{
        projIdArr.push(proj.project_id)
        proj.extracted_content = JSON.parse(proj.extracted_content)
        let localObj = {
            projectName:proj.project_name,
            projectExtracted:proj.extracted_content,
            projectId:proj.project_id
        }
        localStorage.setItem(proj.project_id, JSON.stringify(localObj))
    })
    localStorage.setItem("projects", JSON.stringify(projIdArr))
}

export function saveSingleProject(projectDetails:ProjectDetailsStruc){
    let getProjArr = JSON.parse(localStorage.getItem("projects"))
    getProjArr.push(projectDetails.projectId)
    localStorage.setItem("projects", JSON.stringify(getProjArr))
    localStorage.setItem(projectDetails.projectId, JSON.stringify(projectDetails))
}