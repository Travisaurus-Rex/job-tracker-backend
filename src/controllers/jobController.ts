import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.jobApplication.findMany({
    where: { deletedAt: null }
  });
  res.json(jobs);
};

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await prisma.jobApplication.findUnique({
    where: { id: Number(id) },
  });

  if (!job) {
    throw { status: 404, message: 'Job not found' };
  }

  res.json(job);
};

export const createJob = async (req: Request, res: Response) => {
  const { companyName, jobTitle, location, status, appliedDate, jobUrl, notes } = req.body;

  if (!companyName || !jobTitle || !status || !appliedDate) {
    throw { status: 400, message: 'Missing required job fields' };
  }

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
};

export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const existing = await prisma.jobApplication.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    throw { status: 404, message: 'Job not found' };
  }

  const job = await prisma.jobApplication.update({
    where: { id: Number(id) },
    data: updates,
  });

  res.json(job);
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.jobApplication.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    throw { status: 404, message: 'Job not found' };
  }

  await prisma.jobApplication.update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() },
  });

  res.status(204).end();
};
