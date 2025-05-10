#!/bin/bash
# Scripts to check image sizes
# Useful for finding large images that should be optimized

# Check total size of image files
echo "🌟 Image Size Analysis 🌟"
echo "------------------------"

# Check total size of all images in public folder
echo -e "\n📁 All images in public folder:"
find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -exec du -ch {} \; | grep total

# Check top largest images
echo -e "\n🔎 Top 5 largest images:"
find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -exec du -h {} \; | sort -hr | head -5

# Check by file type
echo -e "\n📊 Size by file type:"
echo "PNG files:"
find public -name "*.png" -exec du -ch {} \; | grep total
echo "JPG files:"
find public \( -name "*.jpg" -o -name "*.jpeg" \) -exec du -ch {} \; | grep total
echo "GIF files:"
find public -name "*.gif" -exec du -ch {} \; | grep total

echo -e "\n✅ Done!"
