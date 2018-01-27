# stocking-stuffer
Interactive CLI to publish functions as their own CLI (meta I know)


## Prompts that are always needed. 

- Cli name: name of the cli to be created duoy.

## Persistant data.

Giftwrap uses a created directory. `usr/local/giftwrap`. Somethings that exist.

+ `options.json` - some configration options to customize how giftwrap behaves.
+ `clis/` - the saved clis. user can run `giftwrap run <cli-name>` to access a file here.