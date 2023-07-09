import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

import {
  createPackageJSON,
  exec,
  fsOverWriteFile,
  getOneValueFromPairs,
  getValuesFromPairs,
  input,
  install,
  withSideEffectsFirst,
} from './utils'
import { logDone } from './utils'

interface ProjectInfo {
  readonly project: { readonly name: string; readonly path: string }
  readonly template: { readonly name: string; readonly path: string }
  readonly dependencies: { readonly [key: string]: 'workspace:*' }
}

const templates = ['nextjs', 'react-components', 'library']

const chekIfProjectNameIsExists = (templates: string[]) => {
  switch (true) {
    case !process.argv[2] || process.argv[2].trim().length === 0:
      return Promise.reject(chalk.red('Project name is required'))

    case fs.existsSync(`./projects/${process.argv[2]}`):
      return Promise.reject(chalk.red('Project name already exists'))
    default:
      return templates
  }
}

const createReadMe = ({ project, template }: ProjectInfo) =>
  withSideEffectsFirst(
    fsOverWriteFile(`${project.path}/README.md`, `# ${project.name}`)
  )({
    project,
    template,
  })

const copyProject = ({ project, template, dependencies }: ProjectInfo) =>
  exec(`cp -r ${template.path} ${project.path}`).then(() => ({
    project,
    template,
    dependencies,
  }))

const createPkg = ({ dependencies, project, template }: ProjectInfo) => {
  const pkg = createPackageJSON({
    ...require(`${project.path}/package.json` as any),
    name: project.name,
    author: '',
    description: '',
    version: '0.0.0',
    license: 'MIT',
    keywords: [],
    repository: '',
    dependencies,
  })()

  console.log(dependencies)

  return withSideEffectsFirst(
    fsOverWriteFile(`${project.path}/package.json`, pkg)
  )({
    project,
    template,
  })
}

const getProjectInfo = (templateName: string) => {
  const projectName = process.argv[2]
  const projectPath = `${process.cwd()}/projects/${projectName}`
  const templatePath = `./_templates/${templateName}`

  return {
    project: { name: projectName, path: projectPath },
    template: { name: templateName, path: templatePath },
  }
}

const selectTempalte = (_values: string[]) =>
  inquirer.prompt({
    type: 'list',
    name: 'templates',
    message: 'Select template',
    choices: templates,
  })

const getDirNames = (dir: string) =>
  fs.promises
    .readdir(dir)
    .then((result) =>
      result.filter((name) => fs.statSync(`${dir}/${name}`).isDirectory())
    )

const selectDependencies = (info: Omit<ProjectInfo, 'dependencies'>) =>
  getDirNames(`${process.cwd()}/projects`).then((choices) =>
    inquirer
      .prompt({
        type: 'checkbox',
        name: 'projects',
        message: 'Select project',
        choices: ['None', ...choices],
      })
      .then(getValuesFromPairs('projects'))
      .then((dependencies) => ({
        ...info,
        dependencies: dependencies.reduce(
          (acc, dep) => ({
            ...acc,
            [dep]: 'workspace:*',
          }),
          {}
        ),
      }))
      .catch((error) => error)
  )

input(templates)
  // .then(chekIfProjectNameIsExists)
  .then(selectTempalte)
  .then(getOneValueFromPairs('templates'))
  .then(getProjectInfo)
  .then(selectDependencies)
  .then(copyProject)
  .then(createPkg)
  .then(createReadMe)
  .then(install)
  .then(logDone)
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

/* TODO:
  1. create nextjs template
  2. create react-components template
  3. package.json options
  4. add other projects as dependencies
  5. update restore-termilas
  */

getOneValueFromPairs
getProjectInfo
copyProject
createPkg
createReadMe
install
logDone
getDirNames
getValuesFromPairs
chekIfProjectNameIsExists
