#! /usr/bin/env node

'use strict';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { createRequire, } from "module";
import {capitalizeFirstLetter, toCamelCase, log} from './utils.js'

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_OUT_DIR = process.cwd()

const templatesDir = path.join(__dirname, 'templates')

const CHOICES_LSIT = [
  // {
  //   value: 'fullPage',
  //   name: '完整Page页面'
  // },
  {
    value: 'list.tsx',
    name: '列表页'
  },
  {
    value: 'detail.tsx',
    name: '详情页'
  },
  {
    value: 'service.ts',
    name: '接口文件'
  },
  {
    value: 'buildAndEdit.tsx',
    name: '新建编辑页'
  },
  {
    value: 'empty.tsx',
    name: '空白页面'
  }
]

const promptQuestions = [
  {
    type: 'list',
    name: 'template',
    message: '请选择模板：',
    choices: CHOICES_LSIT,
  },
  {
    type: 'input',
    name: 'fileName',
    message: '请输入生成的文件名（默认当前执行命令的目录下）：',
    validate(input) {
      if (!input) {
        return '文件名不能为空'
      }
      return true
    }
  },
]

/**
 * 
 * @param {String} tplFilePath 模板路径
 * @param {String} fileName 新文件名称
 * @param {String} outputFolder 新文件的路径
 */
function createTemplateFile(tplFilePath, fileName, outputFolder) {
  const outputFileName = `${fileName}${path.extname(tplFilePath)}`
  const outputPath = path.join(outputFolder, outputFileName)
  try {
    if (fs.existsSync(outputPath)) {
      throw new Error(`${outputPath} file already exist`)
    }
    const tplContent = fs.readFileSync(tplFilePath, 'utf-8')
    const renderedTemplate = ejs.render(tplContent, {
      pageName: capitalizeFirstLetter(toCamelCase(fileName))
    })
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, {recursive: true})
    }
    fs.writeFileSync(outputPath, renderedTemplate)
    log('SUCCESS', outputFileName)
  } catch (e) {
    log('FAILED', outputFileName, e.message)
  }
}

program.version(pkg.version, '-v, --version').description('command line 快速创建模板文件')

program
  .command('create')
  .alias('c')
  .option('-o, --outpout <string>', '指定创建目录', DEFAULT_OUT_DIR)
  .action(function(str, options) {
    const {outpout} = this.opts()
    const outDir = path.resolve(DEFAULT_OUT_DIR, outpout)
    inquirer.prompt(promptQuestions).then((answers) => {
      console.log('answers...', answers)
      const templateFilePath = path.join(templatesDir, answers.template)
      createTemplateFile(templateFilePath, answers.fileName, outDir)
    })
  })



program.parse(process.argv);



