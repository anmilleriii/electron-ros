#include <stdlib.h>

int main()
{
    // see: https://stackoverflow.com/questions/43659084/source-bashrc-in-a-script-not-working?rq=1
    // Source ROS, grant executable permissions to the Electron app (AppImage here),
    // and launch the Electron application from the same interactive terminal.
    // n.b. the regex naively searches for the first version matched filename, so don't
    // include multiple versions in the same directory.
    system("bash -i -c \"source /opt/ros/foxy/setup.bash && chmod +x $(ls | grep 'app-.[^\s]*' | head -1) && ./$(ls | grep 'app-.[^\s]*' | head -1)\"");
    return 0;
}