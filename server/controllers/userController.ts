import { Request, Response } from "express";
import { prisma } from "../configs/prisma.js";



//Get User Credits
const getUserCredits = async(req:Request, res:Response) => {
    try{
        const {userId} = req.auth();
        if(!userId) {return res.status(401).json({message: 'Unauthorized'})}

        const user = await prisma.user.findUnique({
            where: {id: userId}
        })
        res.json({credits:  user?.credits})

    } catch(error:any){
        res.status(500).json({message:error.code || error.message})
    }
}

//Get All User Projects
const getAllProjects = async(req:Request, res:Response) => {
    try{
        const {userId} = req.auth();
        const projects = await prisma.project.findMany({
            where:{userId},
            orderBy:{createdAt:'desc'}
        })
        res.json({projects})

    } catch(error:any){
        res.status(500).json({message:error.code || error.message})
    }
}

//Get Project by id

const getProjectById = async(req:Request, res:Response) => {
    try{
         const {userId} = req.auth();
         const {projectId} = req.params;
        const project = await prisma.project.findUnique({
            where:{id: projectId,userId}
        })

        if(!project) {return res.status(404).json({message:'Project Not Found'})}
        res.json({project})

    } catch(error:any){
        res.status(500).json({message:error.code || error.message})
    }
}

// Published or Unpublished Project 
const toggleProjectPublic = async(req:Request, res:Response) => {
    try{
         const {userId} = req.auth();
         const {projectId} = req.params;
        const project = await prisma.project.findUnique({
            where:{id: projectId,userId}
        })

        if(!project) {return res.status(404).json({message:'Project Not Found'})}
        // res.json({project})

        if(!project?.generatedImage && !project?.generatedVideo){
            return res.status(404).json({message: 'Image or Video Not Generated'})
        }

        await prisma.project.update({
            where:{id:projectId},
            data:{isPublished: !project.isPublished}
        })

        res.json({isPublished: !project.isPublished})

    } catch(error:any){
        res.status(500).json({message:error.code || error.message})
    }
}


export {getUserCredits, getAllProjects, getProjectById,toggleProjectPublic}
