module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: '**/*.scss',
                    ext: '.css',
                    dest: 'assets/css'
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/css/*.css',
                        './*.html'
                    ],
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks:['sass']
            },
            fonts: {
                files: '**/*.svg',
                tasks:['webfont']
            }
        },
        webfont: {
            icons: {
                src: 'app/assets/svg/*.svg',
                dest: 'app/fonts',
                destCss: 'app/assets/sass',
                options: {
                    font: "db_icons",
                    hashes: false,
                    stylesheet: "scss",
                    htmlDemo: true,
                    engine: 'node',
                    autoHint: false,
                    templateOptions: {
                        baseClass: 'db',
                        classPrefix: 'icon-'
                    },
                    callback: function(){
                        runt.file.write('app/font.json', 'teeeest');
                    }
                }
            }
        }
    });

   grunt.registerTask('watcher', ['browserSync', 'sass', 'watch']);
   grunt.registerTask('font', ['webfont' ]);

}