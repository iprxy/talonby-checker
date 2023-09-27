import { Octokit } from '@octokit/rest';
const { GITHUB_REPOSITORY, GITHUB_TOKEN } = process.env;

if (!GITHUB_REPOSITORY || !GITHUB_TOKEN) throw new Error('check your environments');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const [owner, repo] = GITHUB_REPOSITORY.split('/');

type UpdatedVariable = {
  name: string;
  value: string;
};

export const updateVariable = (variable: UpdatedVariable) =>
  octokit.repos.update({ owner, repo, variable: [variable] });
