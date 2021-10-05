#include <stdlib.h>

int main() {
    // putenv("PS1=BobeTerm");
    // see: https://stackoverflow.com/questions/43659084/source-bashrc-in-a-script-not-working?rq=1
    system("bash -i -c \"source /opt/ros/foxy/setup.bash && ros2\"");
    // system("bash -i -c \"source /opt/ros/foxy/setup.bash && ./editor\"");


    return 0;
}