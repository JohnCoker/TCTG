#!/bin/bash
# from https://gist.github.com/jonathandixon/7043297
 
# ----
# Text Colors and Messaging Functions
 
textReset=$(tput sgr0)
textRed=$(tput setaf 1)
textGreen=$(tput setaf 2)
textYellow=$(tput setaf 3)
 
message_info () {
  echo "$textGreen[project]$textReset $1"
}
message_warn () {
	echo "$textYellow[project]$textReset $1"
}
message_error () {
	echo "$textRed[project]$textReset $1"
}
 
# ----
# Help Output
 
show_help () {
	echo ""
	message_info "This script performs the necessary command-line operations for this app."
	message_info ""
	message_info "The following options are available:"
	message_info ""
	message_info "    -c (--clean): Removes generated directories and content. Combine with -i."
	message_info "    -h (--help): Displays this help message."
	message_info "    -i (--init): Runs all operations necessary for initialization."
	message_info "    -m (--merge): Merges content of 'platform-merges' with 'platform'."
	message_info "    -n (--icons): Copies icon and splash screen images to platform directories."
	message_info "    -p (--plugins): (Re)Installs all plugins."
	message_info "    -u (--update): Update platform codebase, runs 'cordova prepare'."
	message_info ""
	message_info "Examples:"
	message_info ""
	message_info "    ./project.sh   # This is the same as using the -i option."
	message_info "    ./project.sh -c -i"
	echo ""
}
 
# ----
# Script Option Parsing
 
init=0;
merge=0;
plugins=0;
icons=0;
clean=0;
update=0;
 
while :; do
	case $1 in
		-h | --help | -\?)
			show_help
			exit 0
			;;
		-i | --init)
			init=1
			;;
		-m | --merge)
			merge=1
			;;
		-p | --plugins)
			plugins=1
			;;
		-n | --icons)
			icons=1
			;;
		-c | --clean)
			clean=1
			;;
		-u | --update)
			update=1
			;;
		--) # End of all options
			break
			;;
		-*)
			echo ""
			message_error "WARN: Unknown option (ignored): $1"
			show_help
			exit 1
			;;
		*)  # no more options. Stop while loop
			break
			;;
	esac
	shift
done
 
if [[ $merge = 0 ]] && [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $clean = 0 ]] && [[ $update = 0 ]] ; then
	# If no options specified then we're doing initialization.
	init=1
fi
 
# ----
# Clean
 
if [[ $clean = 1 ]] ; then
	if [[ -d "plugins" ]] ; then
		message_info "Removing 'plugins' directory."
		rm -rf plugins
	fi
 
	if [[ -d "platforms" ]] ; then
		message_info "Removing 'platforms' directory."
		rm -rf platforms
	fi
fi
 
if [[ $merge = 0 ]] && [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $init = 0 ]] && [[ $update = 0 ]] ; then
	exit 0
fi
 
# ----
# Make sure necessary directories exist, regardless of options.
 
if [[ ! -d "plugins" ]] ; then
	message_info "Creating 'plugins' directory."
	mkdir plugins
fi
 
if [[ ! -d "platforms" ]] ; then
	message_info "Creating 'platforms' directory."
	mkdir platforms
fi
 
# ----
# Add platforms
 
if [[ $init = 1 ]] ; then
	# TODO Check if platforms have already been added
	# 'cordova platforms'
 
	message_info "Adding Android platform..."
	cordova platform add android
 
	message_info "Adding iOS platform..."
	cordova platform add ios
fi
 
# ----
# Merge platform overrides.
 
if [[ $init = 1 ]] || [[ $merge = 1 ]] ; then
	message_info "Merging Android platform customizations..."
	cp -R platform-merges/android/* platforms/android/
 
	message_info "Merging iOS platform customizations..."
	cp -R platform-merges/ios/* platforms/ios/
fi
 
# ----
# Generate App Icons and Splash Screen Images
 
if [[ $init = 1 ]] || [[ $icons = 1 ]] ; then

        version=`grep '<widget' config.xml | sed 's/^.*version="\([^"]*\)".*$/\1/'`
        message_info "(Using version '$version' for splash screen images.)"
        splashmsg="launching ThrustCurve to-go $version ..."

	function getsize {
        	size=`identify "$f" | sed -e 's/^.* PNG *//' -e  's/ .*$//'`
                ptsize=12
                if [ "`echo "$size" | sed 's/x.*$//'`" -gt 500 ]; then
                        ptsize=24
                fi
        }

        if [ -d platforms/android ]; then
		message_info "Generating Android app icons and splash screen images..."

        	for f in platforms/android/res/drawable*/icon.png; do
                	getsize "$f"
                        convert icon.png -background none -resize "$size" "$f"
                done

                bgcolor='#3d3d3d'
                txcolor='white'
        	for f in platforms/android/res/drawable*/screen.png; do
                	getsize "$f"
                        convert icon.png -background "$bgcolor" -gravity center -resize "256x256" \
                                -extent "$size" \
                                -fill "$txcolor" -pointsize "$ptsize" -gravity south -annotate +0+3 "$splashmsg" \
                                "$f"
                done
        fi
 
        if [ -d platforms/ios ]; then
		message_info "Generating iOS app icons and splash screen images..."

        	for f in platforms/ios/ThrustCurve/Resources/icons/*.png; do
                	getsize "$f"
                        convert -background none icon-ios.png -resize "$size" "$f"
                done

                bgcolor='#f5f5f5'
                txcolor='black'
        	for f in platforms/ios/ThrustCurve/Resources/splash/*.png; do
                	getsize "$f"
                        convert icon.png -background "$bgcolor" -gravity center -resize "256x256" \
                                -extent "$size" \
                                -fill "$txcolor" -pointsize "$ptsize" -gravity south -annotate +0+3 "$splashmsg" \
                                "$f"
                done
        fi

fi
 
# ----
# Add Plugins
 
if [[ $init = 1 ]] || [[ $plugins = 1 ]] ; then
 
	message_info "adding Splash Screen plugin..."
	cordova plugin add org.apache.cordova.splashscreen

	message_info "adding Device plugin..."
	cordova plugin add org.apache.cordova.device

	message_info "adding Dialogs plugin..."
	cordova plugin add org.apache.cordova.dialogs

	message_info "adding In-App Browser plugin..."
	cordova plugin add org.apache.cordova.inappbrowser

	message_info "adding Network Information plugin..."
	cordova plugin add org.apache.cordova.network-information

	message_info "adding Screen Orientation plugin..."
	cordova plugin add net.yoik.cordova.plugins.screenorientation

	message_info "adding Status Bar plugin..."
        cordova plugin add org.apache.cordova.statusbar

	message_info "adding Google Analytics plugin..."
	cordova plugin add https://github.com/danwilson/google-analytics-plugin.git 

fi
 
# ----
# Prepare Platforms
if [[ $init = 1 ]] || [[ $update = 1 ]] ; then
	message_info "Syncing 'www' with Android platform..."
	cordova prepare android
 
	message_info "Syncing 'www' with iOS platform..."
	cordova prepare ios
fi
