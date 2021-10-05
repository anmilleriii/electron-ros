#include <stdlib.h>

int main() {
    // putenv("PS1=BobeTerm");
    system("bash -i -c \"source /opt/ros/foxy/setup.bash && ./editor\"");


    return 0;
}