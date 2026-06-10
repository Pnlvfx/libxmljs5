#!/usr/bin/env node
// Patches node-gyp's create-config-gypi.js to reset ThinLTO flags on Windows.
// Node 26 Windows binaries are built with ThinLTO (Clang/LLD), which causes
// node-gyp to inject -flto=thin and /opt:lldltojobs into AdditionalOptions for
// all addon builds. MSVC's link.exe fatally errors on lldltojobs (LNK1117).
'use strict'
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const needle = `    if (config.variables.clang === 1) {
      config.variables.clang = 0
    }
  }`

const patch = `    if (config.variables.clang === 1) {
      config.variables.clang = 0
    }
    // Node 26 Windows binaries are built with ThinLTO (Clang/LLD) but addons
    // are compiled with MSVC which doesn't understand these flags, causing
    // fatal linker error LNK1117. Reset them so common.gypi conditions don't fire.
    variables.enable_thin_lto = 'false'
    variables.enable_lto = 'false'
  }`

try {
  const nodeGypPath = resolve(__dirname, '..', 'node_modules', 'node-gyp', 'lib', 'create-config-gypi.js')
  const content = readFileSync(nodeGypPath, 'utf8')
  if (content.includes('enable_thin_lto')) {
    process.stdout.write('patch-node-gyp: already patched, skipping\n')
  } else if (!content.includes(needle)) {
    process.stdout.write('patch-node-gyp: needle not found, node-gyp may have changed -- skipping\n')
  } else {
    writeFileSync(nodeGypPath, content.replace(needle, patch))
    process.stdout.write('patch-node-gyp: patched node-gyp create-config-gypi.js\n')
  }
} catch (err) {
  process.stdout.write(`patch-node-gyp: ${err.message} -- skipping\n`)
}
