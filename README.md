
## Why nwjs-nodegit?

This [Yeoman generator](http://yeoman.io/) aims to simplify the setup for running nodegit inside of nw.js. 
The focus is on build dependencies and verification and not architectural structure.

Despite all of the resources and elements involved the manual process is actually quite simple. 

The engines configuration and nw.js version has to be correctly included in the package json before installing nodegit. Alternatively, you can 
correct the configuration and either run nw-gwp manually or npm install to kick off the nodegit install.

The key configuration settings to get right are here 

[root package.json](https://github.com/pebanfield/generator-nwjs-nodegit/blob/master/generators/app/templates/_package.json#L12)

and for later build here

[build setting](https://github.com/pebanfield/generator-nwjs-nodegit/blob/master/generators/app/templates/Gulpfile.js#L8)

Note : This version has to match the nw.js installation version. This has only been tested on Mac OS. 

### Pre-requisites

- [Node JS](https://nodejs.org/)
- [nw.js](https://github.com/nwjs/nw.js/) (formerly node-webkit)
- [xCode](https://developer.apple.com/xcode/downloads/) 
- [xCode Command Line Tools](https://developer.apple.com/library/ios/documentation/DeveloperTools/Conceptual/WhatsNewXcode/Articles/xcode_4_3.html#//apple_ref/doc/uid/1006-SW2)
- [Yeoman Tools](http://yeoman.io/learning/index.html)

#### optional 
  
  - [nw-gyp](https://github.com/nwjs/nw.js/wiki/Build-native-modules-with-nw-gyp) (run by nodegit install)
  
### Quickstart Steps 

After you have installed the tools above - Try these terminal commands first and see the additional information/resources below if you get stuck.

```bash
npm install -g generator-nwjs-nodegit
mkdir myTest && cd myTest && yo nwjs-nodegit
alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs"
nw nwapp
```

If this has worked correctly, you should see a webkit instance open. You should also see console.log output showing
git history comments from the sample repo included in the generator template.

### Conceptual Overview

This Yeoman project template is intended to facilitate setting up a [node-webkit](http://nwjs.io/) (nw.js) project
build that includes the [nodegit](http://www.nodegit.org/) native library.

The main difficulty arises from the fact that nodegit consists of node bindings to the native libgit2 component. This means that
libgit2 must be compiled for the specific operating system and version of nw.js webkit being developed. 


## Additional Resources

All the information above was consolidated from the resources below.

- [NW.JS](http://nwjs.io/)
- [nw.js install](http://www.nodegit.org/guides/install/nw.js/)
- [How to Run Apps](https://github.com/nwjs/nw.js/wiki/How-to-run-apps)
- [nodegit](http://www.nodegit.org/)
- [nw/gyp](https://github.com/nwjs/nw-gyp)
- [Build with Gyp](https://github.com/nwjs/nw.js/wiki/Build-native-modules-with-nw-gyp)

Also, the Yeoman template includes a gulp build that includes [node-webkit-builder](https://github.com/mllrsohn/node-webkit-builder)

### Common Errors 

The most common error is -

```Message:
    Module version mismatch. Expected 14, got 43.
Stack:
  Error: Module version mismatch. Expected 14, got 43.
```

This error arises when you are trying to run a version of libgit2 that is not
compiled for your OS and version of webkit. When you npm install nodegit the install 
script compiles the native component. If you have not specified the correct version up front 
then will likely see the above error.

This issue can be corrected after the fact by recompiling nodegit libgit2 with nw-gyp. For example, 

```
  nw-gyp rebuild --target=0.12.2
```

You can find more detail at [here](https://github.com/nodegit/nodegit#nwjs-node-webkit)

Also, note that the configuration called out [here](http://www.nodegit.org/guides/install/nw.js/) has already been included 
within the generator template [here](https://github.com/pebanfield/generator-nwjs-nodegit/blob/master/generators/app/templates/_package.json#L11).

Once this configuration is set up and 

## License

MIT
