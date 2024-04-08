# ThrustCurve to-go Phone App

This application is built using PhoneGap for cross-device support and Kendo UI mobile for the
application framework and native appearance of the widgets.
 - http://cordova.apache.org/
 - http://www.telerik.com/kendo-ui

The application has been targeted to iOS and Android phones (roughly 4" displays) and so is
completely focused on the small-screen experience.  Tablets are better off using the full
ThrustCurve.org web site.

There are lots of requirements to build and test on both platforms.  These are the Mac
instructions.  Other UNIX platforms should be similar.  Note that I use MacPorts, but Homebrew
should work in a similar way.

Install PhoneGap (project Cordova):
  - http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html
  - % `sudo npm install -g cordova`

Make sure XCode is set up properly:
  - % `sudo xcode-select --install`
  - % `sudo xcodebuild -license`

Install the shim programs for iOS development:
 - % `sudo npm install -g ios-deploy ios-sim`

Install and set up the Android simulator:
 - % `sudo port install android`
 - fix install problems
 - % `sudo chmod a+x /opt/local/share/java/android-sdk-macosx/tools/android`
 - % `sudo ln -s /opt/local/share/java/android-sdk-macosx/tools/android /opt/local/bin`
 - also need ant
 - % `sudo port install apache-ant`

 - make sure API 19 is installed
 - % `android &`
 - let it update the SDK
 - check "Android 4.4.2 (API 19)" and install

Set up the platforms and plugins:
 - % `./project.sh -i`

Testing with the iOS simulator is straight-forward:
 - % `cordova run ios`

Setting up the Android simulator takes more work:
 - set up a device image
 - % `android avd &`
 - click Create... and set up a virtual device
 - click Start... to start your device

 - start the app
 - % `cordova run android`
 - (you will need to start up an AVD each time you want to use the simulator)

 - Note that if you use brew or manual installation of Android, you may not need to
 - do the first set of post-install fixes.  Just make sure you can run the android
 - command as a regular user.

To run the Jasmine unit tests of the JavaScript code:
 - % `open www/spec.html`


To publish the app, you must sign it for each app store.

Android key store:
 - http://developer.android.com/tools/publishing/app-signing.html
 - % `keytool -genkey -v -keystore platform-merges/android/release-key.keystore -alias tctg -keyalg RSA -keysize 2048 -validity 10000`
 - % `./project -c -i`
 - % `cordova build android --release`
 - (enter keystore password when prompted)


iOS Provisioning Profiles
 - https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
 - http://cordova.apache.org/docs/en/4.0.0/guide_platforms_ios_index.md.html
