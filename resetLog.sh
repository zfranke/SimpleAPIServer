#!/bin/bash
# This script will reset the log file

# Set the log file name
LOGFILE=Logs/application.log

# Check if the log file exists
if [ -f $LOGFILE ]; then
    # If the log file exists, delete it
    rm $LOGFILE
fi

# Create a new log file
touch $LOGFILE

# Set the permissions on the log file
chmod 777 $LOGFILE

