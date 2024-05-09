#!/bin/bash

# Usage: ./create_thumbnails.sh [directory] [--recursive]
# Example: ./create_thumbnails.sh /path/to/images --recursive

directory=$1
recursive=$2

function create_thumbnail {
    for img in "$1"/*; do
        if [[ -d "$img" && "$recursive" == "--recursive" ]]; then
            create_thumbnail "$img" "$recursive"  # Recursive call if directory
        elif [[ -f "$img" && "$img" != *"thumb_"* ]]; then
            # Process each image file that doesn't start with "thumb_"
            local filename=$(basename "$img")
            local dirname=$(dirname "$img")
            local thumbnail="${dirname}/thumb_${filename}"
            # Generate a thumbnail with FFmpeg, long edge set to 256 pixels
            ffmpeg -i "$img" -vf "scale='min(256,iw)':-1" -threads 1 "$thumbnail"
        fi
    done
}

# Start processing from the specified directory
create_thumbnail "$directory" "$recursive"
