/**
 *
 * @Author - Eugene Mutai
 * @Twitter - JheneKnights
 * @Email - eugenemutai@gmail.com
 *
 * Date: 06/04/14
 * Time: 8:12 PM
 * Description: The default grunt setup
 * Licensed under MIT (https://github.com/jheneknights/knightstart/blob/master/docs/LICENSE-MIT)
 */

// Being a frontend developer
// if you haven’t yet added Grunt.js to your workflow, 
// then you are seriously missing something.

//      _ _                       _  __      _       _     _       
//     | | |__   ___ _ __   ___  | |/ /_ __ (_) __ _| |__ | |_ ___ 
//  _  | | '_ \ / _ \ '_ \ / _ \ | ' /| '_ \| |/ _` | '_ \| __/ __|
// | |_| | | | |  __/ | | |  __/ | . \| | | | | (_| | | | | |_\__ \
//  \___/|_| |_|\___|_| |_|\___| |_|\_\_| |_|_|\__, |_| |_|\__|___/
//                                             |___/               

'use strict';

var LIVERELOAD_PORT = 35729;

// # Globbing Tut
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    // This replaces the tiresome task of including all grunt-plugins as you would have done below
    // These plugins provide necessary tasks. -- loading grunt plugins
    // Equivalent to:
    // require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); //using matchdep
    // OR:
    // -------------------------------------------------------------
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        app: {
            file_name: 'index',
            file_being_editted: '<%= app.file_name %>.jade', // Set the current file that you are editing
            // Incase if dev is using html, make the html be copied
            // to .tmp/ folder as task related to html can access it from here
            compiled_html: '<%= app.file_name %>.html',
            flatten_test_path: false, // Set to "true"  to export to silverstripe as theme
            dist_folder: "dist",
            dev_folder: "app",
            test_folder: "test",
            banner: "/*!\n *\n * @Author - Eugene Mutai\n * @Twitter - JheneKnights\n * @Email - eugenemutai@gmail.com\n *\n * Date: <%= grunt.template.today('dd/mm/yyyy') %>\n * Time: <%= grunt.template.today('hh:mm') %>\n * Description: <%= pkg.description %>\n * Licensed under <%= pkg.license.type %> ( <%= pkg.license.url %>)\n * Ayyee, Ayyee! Always happy to help. :) \n */\n"
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                // Using this:
                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                files: [{
                    dot: true,
                    // dont delete the git folder
                    src: ['.tmp', '<%= app.dist_folder %>', '!<%= app.dist_folder %>/.git*']
                }]
            },
            test: ['.tmp', '<%= app.test_folder %>']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    // dot: true,
                    cwd: '<%= app.dev_folder %>/', // "app/" folder
                    dest: '<%= app.dist_folder %>/',
                    src: ['{,*/}*.{ico,png,txt,htaccess,md,markdown}', 'images/*', 'fonts/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: '.tmp/',
                    dest: '<%= app.dist_folder %>/',
                    src: ['{,*/}*.{css,js}', 'js/*', 'css/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: 'test/',
                    dest: '<%= app.dist_folder %>/',
                    src: ['{,*/}*.{htm,html}', '<%= app.compiled_html %>']
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    dest: '<%= app.test_folder %>/',
                    src: ['images/*', 'fonts/*']
                }, {
                    expand: true,
                    // dot: true,
                    cwd: '.tmp/',
                    dest: '<%= app.test_folder %>/',
                    src: ['{,*/}*.{css,js}', 'js/*', 'css/*']
                }]
            },
            test_unpackaged: {
                files: [{
                    expand: true,
                    // cwd: 'app/',
                    dest: '<%= app.test_folder %>/',
                    src: '{,*/}*.html',
                }, {
                    expand: true,
                    // cwd: 'app/',
                    dest: '<%= app.test_folder %>/',
                    // flatten: '<%= app.flatten_test_path =>',
                    src: '<%= dom_munger.data.jsRefs %>'
                }, {
                    expand: true,
                    // dot: true,
                    dest: '<%= app.test_folder %>/',
                    // flatten: '<%= app.flatten_test_path =>',
                    src: '<%= dom_munger.data.cssRefs %>'
                }, {
                    expand: true,
                    cwd: 'app/',
                    dest: '<%= app.test_folder %>/app/',
                    // flatten: '<%= app.flatten_test_path =>',
                    src: ['images/{,*/}*.*', 'fonts/*']
                }, {
                    expand: true,
                    cwd: 'app/',
                    dest: '<%= app.test_folder %>/',
                    // flatten: '<%= app.flatten_test_path =>',
                    src: ['images/{,*/}*.*']
                }, {
                    expand: true,
                    cwd: 'app/',
                    dest: '<%= app.test_folder %>/',
                    // flatten: '<%= app.flatten_test_path =>',
                    src: ['fonts/*']
                }]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'frameworks/bootstrap/dist/',
                    dest: '<%= app.dist_folder %>/',
                    src: ['fonts/*']
                }, {
                    expand: true,
                    cwd: 'frameworks/bootstrap/dist/',
                    dest: '<%= app.test_folder %>/',
                    src: ['fonts/*']
                }]
            },
            others: {
                files: [{
                    expand: true,
                    dest: '<%= app.dist_folder %>/',
                    src: ['.htaccess', 'docs/BSD-License', 'docs/LICENSE-MIT', 'README.md']
                }]
            },
            html: {
                files: [{
                    expand: true,
                    // dot: true,
                    cwd: '',
                    dest: '<%= app.test_folder %>/',
                    src: ['/*.{htm,html}']
                }]
            }
        },

        // Reads the related html file
        // Then can manipulate it using DOM queries
        // Can also be used to extract all related files for concatination and minification
        dom_munger: {
            test: {
                options: {
                    read: [{
                        selector: 'link[rel="stylesheet"]',
                        attribute: 'href',
                        writeto: 'cssRefs',
                        isPath: true
                    }, {
                        selector: 'script[type="text/javascript"]',
                        attribute: 'src',
                        writeto: 'jsRefs',
                        isPath: true
                    }],
                },
                // Takes all the html files that have been compiled and sends it to the <%= app.test_folder %> folder
                // files: [{
                //     expand: true,
                //     cwd: '', // in the root dir
                //     src: '*.html',
                //     dest: '<%= app.test_folder %>/',
                //     ext: '.html'
                // }],

                src: '<%= app.compiled_html %>',
                dest: 'test/<%= app.compiled_html %>' //update the dist/<%= app.compiled_html %> (the src <%= app.compiled_html %> is copied there)
            },
            dist: {
                options: {
                    read: [{
                        selector: 'link[rel="stylesheet"]',
                        attribute: 'href',
                        writeto: 'cssRefs',
                        isPath: true
                    }, {
                        selector: 'script[type="text/javascript"]',
                        attribute: 'src',
                        writeto: 'jsRefs',
                        isPath: true
                    }],
                    remove: ['link[rel="stylesheet"]', 'script[type="text/javascript"]'],
                    append: {
                        selector: 'head',
                        html: '<link href="css/app.full.min.css" rel="stylesheet">'
                    },
                    prepend: {
                        selector: 'application-engine',
                        html: '<script src="js/app.full.min.js"></script>'
                    }
                },
                src: '<%= app.compiled_html %>', //read from source <%= app.compiled_html %>
                dest: 'dist/<%= app.compiled_html %>', //update the dist/<%= app.compiled_html %> (the src <%= app.compiled_html %> is copied there)
            }
        },

        // Concat is a pretty simple task that does exactly what you think it does.
        // concatenate files.
        concat: {
            // Join all the app's css, in this case bootstrap and your css
            options: {
                separator: '\n\n',
                stripBanners: true
            },
            appcss: {
                src: '<%= dom_munger.data.cssRefs %>',
                dest: '.tmp/css/app.full.css'
            },
            // for custom CSS files compilation
            // after customizing the individual css files in bootstrap
            bootstrap: {
                src: ['frameworks/bootstrap/test/*.css'],
                dest: 'app/css/bootstrap.css'
            },
            //Application's javascript dependencies in js/ folder
            appjs: {
                options: {
                    separator: ';\n\n',
                    banner: '<%= app.banner %>'
                },
                src: '<%= dom_munger.data.jsRefs %>',
                dest: '.tmp/js/app.full.js'
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // Minify the CSS concentanated -- application.css
        cssmin: {
            options: {
                banner: '<%= app.banner %>\n\n /* My minified css file */',
                keepSpecialComments: '1', // '*' or 1 or 0
                report: 'min' // 'gzip'
            },
            dist: {
                src: '.tmp/css/app.full.css', //'<%= dom_munger.data.cssRefs %>'
                dest: '.tmp/css/app.full.min.css'
            },
            bootstrap: {
                options: {
                    banner: false
                },
                src: 'app/css/bootstrap.css',
                dest: 'app/css/bootstrap.min.css'
            }
        },

        // Your CSS has now been combined into a single file and compressed. 
        // Lets compress your JavaScript code now by adding a new task called uglify.
        // Uglify does what cssmin does to css, only with javascript.
        uglify: {
            appjs: {
                options: {
                    report: "min", //"gzip",
                    // sourceMap: true,
                    // sourceMapURL: true,
                    preserveComments: "some" //"all"
                },
                files: [{
                    // expand: true,
                    src: '.tmp/js/app.full.js',
                    dest: ".tmp/js/app.full.min.js"
                }]
            }
        },

        // Compile bootstrap LESS files to CSS. -- /test folder
        // Use this if you are customizing the bootstrap css using less
        // https://www.npmjs.org/package/grunt-contrib-less
        less: {
            options: {
                report: 'min',
                sourceMap: false,
                // @path - Specifies directories to scan for @import directives when parsing.
                // Default value is the directory of the source, which is probably what you want
                paths: ['frameworks/bootstrap/less']
            },
            // compile Bootstrap
            files: {
                expand: true,
                cwd: 'frameworks/bootstrap/less/',
                src: '*.less',
                dest: 'frameworks/bootstrap/test',
                ext: '.css'
            }
        },

        // Add vendor prefixed styles to the CSS
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            default: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },

        // minify HTML file
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeComments: true, // Should remove comments from the DIST file [clean markup]
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.test_folder %>/',
                    src: ['{,*/}*.html'],
                    dest: '<%= app.dist_folder %>/',
                    // ext: '.min.html',
                    // extDot: 'last'
                }]
            }
        },

        // Compile Jade templates.
        // STOP WRITTING TIRESOME HTML, you do get tired opening and closing tags dont you?!
        // http://jade-lang.com
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                        expand: true,
                        cwd: 'app/',
                        src: '*.jade',
                        dest: '',
                        ext: '.html'

                        // The path to compile to and the path to where to get the jade files
                        // In this case the in root
                        // "index.html": ['app/index.jade']
                    }]
                    // files: {"index.html": ['app/index.jade'] }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                // For pretty reports in the CLI :)
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            appjs: {
                src: 'app/js/{,*/}*.js'
            },
            afterconcat: ['Gruntfile.js', 'app/js/{,*/}*.js']
        },

        // The command should start server and the should open http://localhost:1500/ in your browser.
        // You can also try changing less / html file, the changes should be reflected on browser without refreshing the page.
        // livereload and starting a development server. 
        connect: {
            options: {
                port: 1515,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= app.test_folder %>']
                }
            },
            dist: {
                options: {
                    open: true,
                    port: 1500,
                    base: '<%= app.dist_folder %>',
                    livereload: false
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        // open: {
        //     server: {
        //         path: 'http://localhost:1515/tellme/index.html'
        //     }
        // },

        // Wouldn't it be awesome if grunt did all of this automatically every time we changed a file?
        // Watch is a grunt plugin written to do just that.
        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // Grouped the files to run specific tasks that are unique to each;
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.{htm,html}',
                    'test/{,*/}*.{js,css}',
                    'dist/{,*/}*.{js,css}',
                    'app/**/*.{png,jpg,jpeg,gif,webp,svg,ttf,otf,woff}'
                ]
            },
            css: {
                files: ["app/**/*.css"],
                tasks: ['dom_munger:test', 'concat:appcss', 'cssmin:dist', 'copy']
            },
            scripts: {
                files: ['app/{,*/}*.js', 'js/{,*/}*.js'],
                tasks: ['dom_munger:test', 'concat:appjs', 'jshint:appjs', 'uglify', 'copy']
            },
            jade: {
                files: ['**/*.jade'],
                // if you do not want to concatinate them replace 'copy:dist' with 'copy:test_unpackaged'
                tasks: ['jade', 'dom_munger:test', 'copy:test_unpackaged', 'dom_munger:dist', 'htmlmin']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            // For Html files
            html: {
                files: ['app/*.html', '<%= app.compiled_html %>'],
                tasks: ['default']
            }
        },

        // To prefix the CSS file with the app's signature
        css_selectors: {
            options: {
                mutations: [{
                    prefix: '.kn9tslab'
                }]
            },
            prefix: {
                src: 'app/css/main.css',
                dest: 'app/css/prefixed-main.css'
            }
        }
    });

    // Default task to run.
    grunt.registerTask('start', [
        'jshint:gruntfile',
        'clean', // clean all the files and folders [.tmp, dist and test]
        'jade', // IMPORTANT: uncomment this if you are using jade to write your html files
    ]);

    // Just split bootstrap into several css mini files
    // For the ones who would work with bootstrap CSS customisation instead of LESS
    grunt.registerTask('bs', function(target) {
        if (target === 'less') {
            // Compile LESS and the concatinate the CSS into bootstrap.css
            return grunt.task.run(['less']);
        } else {
            // With no argument just run join all bootstrap individual files into one
            // Copies to "app/css/" folder for later concatination with user's css
            // -- wraps all bootstrap folders into one
            return grunt.task.run(['concat:bootstrap']);
        }
    });
    // shortcut to bootstrap compiling task
    grunt.registerTask('bootstrap', ['bs'])

    // Serve the app and view changes live
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            // return grunt.task.run(['default', 'connect:dist:keepalive']);
            return grunt.task.run(['start', 'distribution', 'connect:dist:keepalive']);
        }
        grunt.task.run(['start', 'test', 'connect:livereload', 'watch']);
    });

    grunt.registerTask('test', [
        'clean:test', 
        // 'css_selectors',
        // 'concat:bootstrap', // -- wrap all bootstrap folders into one, being done above instead
        'dom_munger:test', //get all required files to concat, cssmin and uglify
        // 'concat:appcss',
        // 'autoprefixer',
        // 'cssmin',
        'jshint:appjs',
        // 'concat:appjs',
        // 'uglify',
        'copy:test_unpackaged', // NEW PROCESS -- get all files from TEST
        // 'distribution', // To also package up the application for distribution
        // 'htmlmin', // Testing does not require minification,
        'copy:html' // to copy the html in the case that it fails
    ]);

    // Tasks for the app distrubution packaging
    grunt.registerTask('distribution', [
        'clean:dist',
        // Process for the END DISTRUBUTED product
        'dom_munger:dist',
        'concat:appcss',
        'autoprefixer',
        'cssmin',
        'jshint:appjs',
        'concat:appjs',
        'uglify',
        'copy:dist',
        'copy:bootstrap', // uncomment if you are using bootstrap, thus copy it's glyphicon fonts
        'copy:others',
        'htmlmin'
    ]);

    // Same as rolling out a production version
    grunt.registerTask('production', ['distribution']);

    // Triggred when watch task is prompted, this is for extra info that you may need
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.ok("--------- info: " + filepath + " has " + action + " || TASK: " + target + " ----------");
    });
    // grunt.registerTask('serve', ['express', 'open', 'watch:server']);

    // Tell Grunt what to do when we type "grunt" into the terminal
    // Could start watching for changes and running related tasks as per changes
    // Run "$ grunt watch" after the default tasks or "$ grunt server" to view your changes live
    // grunt.registerTask('default', ['start']); // default
    grunt.registerTask('default', ['start', 'distribution', 'test']);

};