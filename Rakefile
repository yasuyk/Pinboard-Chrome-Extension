require 'rake/packagetask'

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

desc "Provide icons"
task :icons do
  dir = File.expand_path(File.dirname(__FILE__) + '/src/images')

  [48, 38, 19, 16].each do |size|
    sh "convert #{dir}/pinboard_icon_64.png -geometry #{size}x#{size} #{dir}/pinboard_icon_#{size}.png"
  end

  # optimize icons
  sh "optipng #{dir}/*.png"
end


Rake::PackageTask.new("pinboard", pinboard_version) do |t|
  t.need_zip = true
  t.package_files.include("src/**/*").exclude(/spec.*/)
end

desc "Displays the current version"
task :version do
  say "Current version: %s" % pinboard_version
end


desc "Bumps the version number based on given version"
task :bump, [:version] do |t, args|
  raise "Please specify version=x.x.x !" unless args.version
  version_path = File.open(MANIFEST_FILE)
  version_text = File.read(version_path).sub(/"version" : "\d\.\d\.\d"/, "\"version\" : \"#{args.version}\"")
  say "Updating Pinboard to version %s" % args.version
  File.open(version_path, 'w') { |f| f.write version_text }
  sh 'git commit -am "bump version to %s"' % args.version
  sh 'git tag -a %s -m %s' % [args.version, args.version]
end

desc "run jasmine with phantomjs"
task :run_jasmine do
  # You have to install phantomjs first.
  # Under OS X, install by 'brew install phantomjs'.
  sh 'phantomjs /usr/local/share/phantomjs/examples/run-jasmine.js src/spec/SpecRunner.html'
end

