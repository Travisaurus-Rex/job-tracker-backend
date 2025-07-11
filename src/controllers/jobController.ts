import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobApplication.findMany();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobApplication.findUnique({
      where: { id: Number(id) },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

export const createJob = async (req: Request, res: Response) => {
  const { companyName, jobTitle, location, status, appliedDate, jobUrl, notes } = req.body;
  try {
    const job = await prisma.jobApplication.create({
      data: {
        userId: 1, // TEMP: hardcoded user
        companyName,
        jobTitle,
        location,
        status,
        appliedDate: new Date(appliedDate),
        jobUrl,
        notes,
      },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const job = await prisma.jobApplication.update({
      where: { id: Number(id) },
      data: updates,
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.jobApplication.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
