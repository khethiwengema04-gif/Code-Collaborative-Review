import { Request, Response } from "express";
import * as projectService from "../service/projectService";

import {
    createProjectService,
    findProjectById,
    findUserForProject,
    addProjectMemberService,
    removeProjectMemberService
} from "../service/projectService";


// CREATE PROJECT
export const createProject = async (
    req: Request,
    res: Response
) => {
    try {

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const project = await createProjectService(
            name,
            description,
            req.user.id
        );

        return res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {

        console.error("Create project error:", error);

        return res.status(500).json({
            message: "Failed to create project"
        });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.findAllProject();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};
// GET PROJECTS
// export const getProjects = async (
//     req: Request,
//     res: Response
// ) => {
//     try {

//         const projects = await getProjectsService();

//         return res.status(200).json({
//             projects
//         });

//     } catch (error) {

//         console.error("Get projects error:", error);

//         return res.status(500).json({
//             message: "Failed to retrieve projects"
//         });
//     }
// };


// ADD MEMBER
export const addProjectMember = async (
    req: Request,
    res: Response
) => {
    try {

        const projectId = Number(req.params.id);
        const userId = Number(req.body.userId);

        if (!projectId || !userId) {
            return res.status(400).json({
                message: "Project ID and user ID are required"
            });
        }

        // Check project
        const project = await findProjectById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Check user
        const user = await findUserForProject(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Add member
        const member = await addProjectMemberService(
            projectId,
            userId
        );

        if (!member) {
            return res.status(409).json({
                message: "User is already a member of this project"
            });
        }

        return res.status(201).json({
            message: "User added to project successfully",
            member
        });

    } catch (error) {

        console.error("Add member error:", error);

        return res.status(500).json({
            message: "Failed to add project member"
        });
    }
};


// REMOVE MEMBER
export const removeProjectMember = async (
    req: Request,
    res: Response
) => {
    try {

        const projectId = Number(req.params.id);
        const userId = Number(req.params.userId);

        if (!projectId || !userId) {
            return res.status(400).json({
                message: "Project ID and user ID are required"
            });
        }

        const member = await removeProjectMemberService(
            projectId,
            userId
        );

        if (!member) {
            return res.status(404).json({
                message: "User is not a member of this project"
            });
        }

        return res.status(200).json({
            message: "User removed from project successfully"
        });

    } catch (error) {

        console.error("Remove member error:", error);

        return res.status(500).json({
            message: "Failed to remove project member"
        });
    }
};