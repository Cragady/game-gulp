### One way of starting server from gulp

```javascript
    const gulp = require('gulp'),
        child = require('child_process'),
        fs = require('fs');

    gulp.task('server', function(){
        const server = child.spawn('node', ['server.js']),
            log = fs.createWriteStream('server.log', {flags: 'a'});
        server.stdout.pipe(log);
        server.stderr.pipe(log);
    });
```