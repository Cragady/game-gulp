# Purpose

The purpose of this little pet project is to learn more about gulp and liquid.js 

## Current Issues

Right now, the gulp tasks don't have signaling for asynchronous completion. After stopping the server the following messages show:

`The following tasks did not complete: <series>, <anonymous>, <series>, <anonymous>
Did you forget to signal async completion?`

This seems to be the only thing so far that really needs attention with the initial setup. After I resolve this part, I'll be able to move on to creating a cool little thing for me. 

Another thing that could be worked on is accounting for dynamic growth in the file tree, but that can come after I resolve the async completion errors.