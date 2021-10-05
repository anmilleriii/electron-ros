#include <stdlib.h>

int main() {
    // see: https://stackoverflow.com/questions/43659084/source-bashrc-in-a-script-not-working?rq=1
    // system("bash -i -c \"source /opt/ros/foxy/setup.bash && ros2\"");
    // must be in same folder
    // searches for first matching version
    // todo actual version, what happens? destroys old one?
    // putenv("PS1=?");
    // match first
    // todo need sudo?
    system("bash -i -c \"source /opt/ros/foxy/setup.bash && chmod +x $(ls | grep 'view-.[^\s]*' | head -1) && ./$(ls | grep 'view-.[^\s]*' | head -1)\"");

    
    // system("bash -i -c \"source /opt/ros/foxy/setup.bash && ./view-0.0.0.AppImage\"");
// view-.[^\s]*
    // match "app-*anything*.AppImage"
    // versions highest? what happens on update?
    // app-0.1.0.AppImage

    // can either be same folder launch and app.AppImage OR launch script can find AppImage

    // AppImage location is wherever user puts it. but we know that. 
    // let's say that location is ALWAYS known as /opt/app/ (launch, app-0.1.0.AppImage)
    // have to regex version?
    // On system boot (either restart or clean turn on), crontab runs,
    // does this mean we WILL NOT use autoStart in electron?
    // On app update, launch file will not change/be affected. name has to be same or included.
    // location must remain the same.
    // will the update app flow require re-running launch file in that update? probably.
    // how will we remote into tablets for maintenance/ROS custom changes etc?
    // versions are completely locked due to rclnodejs, need to determine which exactly.
    // need to ensure understanding that this doesn't mess w/proccesses running

// https://superuser.com/questions/90479/what-is-the-conventional-install-location-for-applications-in-linux
// grep -o -a -m 1 -h -r "Pulsanti Operietur" /path/to/dir | head -1
// https://stackoverflow.com/questions/14093452/grep-only-the-first-match-and-stop

    return 0;
}