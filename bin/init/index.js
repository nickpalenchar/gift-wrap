#!/usr/bin/env node

// INIT
// creates a dir in /usr/local named giftwrap for persisting options, if no dir exists
/** @flag -f overwrites the file permanently.
*/

console.log('hello from init ', process.argv);

console.log(process.env.USER);