#! /usr/bin/env node

'use strict';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { createRequire, } from "module";
import {capitalizeFirstLetter, toCamelCase} from './utils.js'

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = process.cwd()

const log = console.log

const templatesDir = path.join(__dirname, 'templates')


const promptQuestions = [
  {
    type: 'list',
    name: 'template',
    message: '请选择模板：',
    choices: [
      ...fs.readdirSync(templatesDir),
      // others...
    ],
  },
  {
    type: 'input',
    name: 'fileName',
    message: '请输入生成的文件名（默认当前执行命令的目录下）：',
    validate(input) {
      if (!input) {
        return '文件名不能为空'
      }
      if (fs.existsSync(path.join(outputDir, `${input}.js`))) {
        return `文件${input}.js已存在，请重新输入文件名`
      }
      return true
    }
  },
]

program.version(pkg.version).description('command line 快速创建模板文件')

program
  .command('create')
  .action(() => {
    inquirer.prompt(promptQuestions).then((answers) => {
      try {
        const templateFilePath = path.join(templatesDir, answers.template)
        const tplContent = fs.readFileSync(templateFilePath, 'utf-8')
        const renderedTemplate = ejs.render(tplContent, {
          pageName: capitalizeFirstLetter(toCamelCase(answers.fileName))
        })
        
        const outputFileName = `${answers.fileName}${path.extname(templateFilePath)}`
      
        const outputPath = path.join(outputDir, outputFileName)
      
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })
        fs.writeFileSync(outputPath, renderedTemplate)
        log('success 创建成功！')
      } catch (e) {
        log('error 创建失败！')
      }
      
    })
  })

program.parse(process.argv);



