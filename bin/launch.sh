#! /bin/bash env -i

source /opt/ros/foxy/setup.bash
/opt/app/$(ls | grep 'app-.[^\s]*' | head -1) --no-sandbox
