#!/bin/bash

# Clear Image Optimization Cache utility script
# ------------------------------------------------

CACHE_FILE=.image-optimization-cache.json

echo "📋 Image Cache Cleanup"
echo "---------------------"

if [ -f "$CACHE_FILE" ]; then
  echo "🔍 Found cache file: $CACHE_FILE"
  
  # Get file size
  FILE_SIZE=$(wc -c < "$CACHE_FILE" | xargs)
  echo "📊 Cache size: $FILE_SIZE bytes"
  
  # Get number of cached images
  if command -v jq &> /dev/null; then
    # If jq is installed, use it for more accurate counting
    IMAGE_COUNT=$(jq '.images | length' "$CACHE_FILE" 2>/dev/null || echo "unknown")
    echo "🖼️  Cached images: $IMAGE_COUNT"
  else
    # Fallback to rough estimate with grep
    IMAGE_COUNT=$(grep -o "hash" "$CACHE_FILE" | wc -l | xargs)
    echo "🖼️  Cached images (estimate): $IMAGE_COUNT"
  fi
  
  # Remove the file
  rm "$CACHE_FILE"
  echo "✅ Cache file deleted successfully"
else
  echo "ℹ️  No cache file found at: $CACHE_FILE"
fi

echo "\nℹ️  Next image optimization will rebuild all images"
echo "⚡ Done!"
