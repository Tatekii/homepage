#!/bin/bash

# Image Analyzer
# This script analyzes image optimization results by comparing original and optimized images

# Configuration
PUBLIC_DIR="public"
OUT_DIR="out"
IMAGE_DIRS=("projects")
FORMATS=("webp" "avif")

# Check if dev mode is specified
if [[ "$1" == "--dev" ]]; then
  DEV_MODE=true
  OUT_DIR="public"
  echo "Running in development mode analysis - checking optimized images in public directory"
else
  DEV_MODE=false
fi

# Terminal colors
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color
BOLD="\033[1m"

echo -e "${BOLD}📊 Image Optimization Analysis${NC}"

# Function to get file size in KB
get_file_size_kb() {
  local file=$1
  if [[ -f "$file" ]]; then
    echo $(echo "scale=2; $(stat -f %z "$file") / 1024" | bc)
  else
    echo "0"
  fi
}

# Check if output directory exists
if [[ ! -d "$OUT_DIR" ]]; then
  echo -e "${YELLOW}Warning: Output directory '$OUT_DIR' not found. Run a build first!${NC}"
  echo "Creating a temporary output directory for analysis..."
  mkdir -p "$OUT_DIR"
fi

# Summary variables
total_original_kb=0
total_webp_kb=0
total_avif_kb=0
total_files=0
best_compression_webp=0
best_compression_avif=0

# Process each directory
for dir in "${IMAGE_DIRS[@]}"; do
  echo -e "\n${BLUE}Analyzing $dir:${NC}"
  
  # Find all original images
  original_images=$(find "$PUBLIC_DIR/$dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \))
  
  # Process each image
  for img in $original_images; do
    rel_path=${img#"$PUBLIC_DIR/"}
    filename=$(basename "$img")
    name="${filename%.*}"
    ext="${filename##*.}"
    dir_path=$(dirname "$rel_path")
    
    # Get original file size
    original_size=$(get_file_size_kb "$img")
    
    # Check WebP version
    webp_path="$OUT_DIR/$dir_path/$name.webp"
    webp_size=$(get_file_size_kb "$webp_path")
    
    # Check AVIF version
    avif_path="$OUT_DIR/$dir_path/$name.avif"
    avif_size=$(get_file_size_kb "$avif_path")
    
    # Calculate savings
    if [[ "$original_size" != "0" ]]; then
      webp_savings=$(echo "scale=2; 100 - ($webp_size / $original_size) * 100" | bc)
      avif_savings=$(echo "scale=2; 100 - ($avif_size / $original_size) * 100" | bc)
    else
      webp_savings="0"
      avif_savings="0"  
    fi
    
    # Update totals
    total_original_kb=$(echo "scale=2; $total_original_kb + $original_size" | bc)
    total_webp_kb=$(echo "scale=2; $total_webp_kb + $webp_size" | bc)
    total_avif_kb=$(echo "scale=2; $total_avif_kb + $avif_size" | bc)
    total_files=$((total_files + 1))
    
    # Compare format performance
    if (( $(echo "$webp_savings > $best_compression_webp" | bc -l) )); then
      best_compression_webp=$webp_savings
      best_webp_file="$rel_path"
    fi
    
    if (( $(echo "$avif_savings > $best_compression_avif" | bc -l) )); then
      best_compression_avif=$avif_savings
      best_avif_file="$rel_path"
    fi
    
    # Print current file stats
    echo "  $rel_path:"
    echo "    Original: ${original_size}KB"
    
    if [[ -f "$webp_path" ]]; then
      echo -e "    WebP:    ${webp_size}KB ${GREEN}(-${webp_savings}%)${NC}"
    else
      echo -e "    WebP:    ${YELLOW}Not found${NC}"
    fi
    
    if [[ -f "$avif_path" ]]; then
      echo -e "    AVIF:    ${avif_size}KB ${GREEN}(-${avif_savings}%)${NC}"
    else
      echo -e "    AVIF:    ${YELLOW}Not found${NC}"
    fi
  done
done

# Print summary
echo -e "\n${BOLD}📈 Optimization Summary:${NC}"
echo "Total images: $total_files"
echo -e "Original size: ${total_original_kb}KB"
echo -e "WebP size:    ${total_webp_kb}KB ${GREEN}(-$(echo "scale=2; 100 - ($total_webp_kb / $total_original_kb) * 100" | bc)%)${NC}"
echo -e "AVIF size:    ${total_avif_kb}KB ${GREEN}(-$(echo "scale=2; 100 - ($total_avif_kb / $total_original_kb) * 100" | bc)%)${NC}"

# Best performers
echo -e "\n${BOLD}🏆 Best Compression Results:${NC}"
echo -e "Best WebP:  $best_webp_file ${GREEN}(-${best_compression_webp}%)${NC}"
echo -e "Best AVIF:  $best_avif_file ${GREEN}(-${best_compression_avif}%)${NC}"

# Generate chart data for README
echo -e "\n${BOLD}📋 Chart Data for Documentation:${NC}"
echo '```'
echo "| Format  | Size (KB) | Savings (%) |"
echo "|---------|-----------|-------------|"
echo "| Original| $total_original_kb | - |"
echo "| WebP    | $total_webp_kb | $(echo "scale=2; 100 - ($total_webp_kb / $total_original_kb) * 100" | bc)% |"
echo "| AVIF    | $total_avif_kb | $(echo "scale=2; 100 - ($total_avif_kb / $total_original_kb) * 100" | bc)% |"
echo '```'
