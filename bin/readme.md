# bin directory

Each directory represents a command that giftwrap can run.

Eg: `giftwrap name-of-command` runs `bin/name-of-command`

The only implicit exception is that omitting a command (eg `giftwrap` or `giftwrap -option` runs `bin/build`

**Therefore ALL directories require some index file to be ran.**

all arguments are passed along in order.

