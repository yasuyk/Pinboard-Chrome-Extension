require 'rake/packagetask'
require 'rake/clean'

CLEAN.include("src/js/**/*")
CLOBBER.include("pkg/**/*")

MANIFEST_FILE = File.expand_path(File.dirname(__FILE__) + '/src/manifest.json')
VERSION_REGEX = Regexp.compile('"version" : "(?<version>\d\.\d\.\d)"')

def pinboard_version
  version = ""
  File.readlines(MANIFEST_FILE).each do |l|
    if data = VERSION_REGEX.match(l)
      version = data[:version]
      break
    end
  end
  version
end

def say(text, color=:magenta)
  n = { :bold => 1, :red => 31, :green => 32, :yellow => 33, :blue => 34, :magenta => 35 }.fetch(color, 0)
  puts "\e[%dm%s\e[0m" % [n, text]
end

# Check for the existence of an executable.
def check(exec, name, url)
  return unless `which #{exec}`.empty?
  puts "#{name} not found.\nInstall it from #{url}"
  exit
end

desc "Provide icons"
task :icons do
  check 'convert', 'ImageMagick', 'http://www.imagemagick.org'
  check 'optipng', 'OptiPNG', 'http://optipng.sourceforge.net/'

  dir = File.expand_path(File.dirname(__FILE__) + '/src/images')

  [48, 38, 19, 16].each do |size|
    sh "convert #{dir}/pinboard_icon_64.png -geometry #{size}x#{size} #{dir}/pinboard_icon_#{size}.png"
  end

  # optimize icons
  sh "optipng #{dir}/*.png"
end

task :package => :compile

Rake::PackageTask.new "pinboard", pinboard_version  do |t|
  t.need_zip = true
  t.package_files.include("src/**/*").
    exclude(/coffee.*/). # exclude CoffeeScript
    exclude(/spec.*/)    # exclude spec code
end


desc "Displays the current version"
task :version do
  say "Current version: %s" % pinboard_version
end

desc "Compile to JavaScript"
task :compile do
  sh 'coffee -o src/js -c src/coffee'
  sh 'coffee -o src/js -bc src/coffee/global.coffee'
 end

desc "Bumps the version number based on given version"
task :bump, [:version] => [:lint, :phantomspec] do |t, args|
  check 'git', 'Git', 'http://git-scm.com/'

  raise "Please specify version=x.x.x !" unless args.version
  version_path = File.open(MANIFEST_FILE)
  version_text = File.read(version_path).sub(/"version" : "\d\.\d\.\d"/, "\"version\" : \"#{args.version}\"")
  say "Updating Pinboard to version %s" % args.version
  File.open(version_path, 'w') { |f| f.write version_text }
  sh 'git commit -am "Bump version to %s"' % args.version
  sh 'git tag -a %s -m %s' % [args.version, args.version]
end

desc "Run jasmine in Chrome"
task :spec_chrome do
  case RbConfig::CONFIG['host_os']
  when /darwin/
    # For information about '--allow-file-access-from-files', see the following URL.
    # https://github.com/velesin/jasmine-jquery#cross-domain-policy-problems-under-chrome
    sh 'open /Applications/Google\ Chrome.app src/spec/SpecRunner.html' +
      ' --args --allow-file-access-from-files'
  end
end

desc "Run jasmine via PhantomJS"
task :spec_phantomjs do
  sh "phantomjs src/spec/helpers/run-jasmine.js src/spec/SpecRunner.html"
end


desc "Run CoffeeLint on source files"
task :lint do
  check 'coffeelint', 'CoffeeLint', 'http://www.coffeelint.org/'
  sh "coffeelint -r src/coffee"
end

desc "task for travis-ci"
task :travisci => [:compile, :lint, :spec_phantomjs]
