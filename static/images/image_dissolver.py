import os
import numpy as np
from PIL import Image, ImageDraw
import random

def dissolve_image(image_path, block_size, frames, speed, output_dir):
    # Load the image
    image = Image.open(image_path).convert("RGBA")
    width, height = image.size

    # Calculate the number of blocks
    x_blocks = width // block_size
    y_blocks = height // block_size

    # Create frames for the dissolving effect
    dissolve_frames = []
    for frame in range(frames):
        frame_image = image.copy()
        draw = ImageDraw.Draw(frame_image)

        # Determine the number of blocks to dissolve in this frame
        blocks_to_dissolve = (frame + 1) * (x_blocks * y_blocks) // frames

        # Randomly select blocks to dissolve
        dissolved_blocks = random.sample([(x, y) for x in range(x_blocks) for y in range(y_blocks)], blocks_to_dissolve)

        # Make the selected blocks transparent
        for x, y in dissolved_blocks:
            draw.rectangle([x * block_size, y * block_size, (x + 1) * block_size, (y + 1) * block_size], fill=(0, 0, 0, 0))

        dissolve_frames.append(frame_image)

    # Save the dissolving GIF
    dissolving_gif_path = os.path.join(output_dir, os.path.basename(image_path).replace('.png', '_dissolve.gif'))
    dissolve_frames[0].save(dissolving_gif_path, save_all=True, append_images=dissolve_frames[1:], optimize=False, duration=speed, loop=0)

    # Save the appearing GIF (reverse of dissolving)
    appearing_gif_path = os.path.join(output_dir, os.path.basename(image_path).replace('.png', '_appear.gif'))
    dissolve_frames.reverse()
    dissolve_frames[0].save(appearing_gif_path, save_all=True, append_images=dissolve_frames[1:], optimize=False, duration=speed, loop=0)

    return dissolving_gif_path, appearing_gif_path

# User inputs
image_name = input("Enter the image name (e.g., image.png): ")
block_size = int(input("Enter the block size for dissolving (e.g., 10): "))
frames = int(input("Enter the number of frames for the GIF: "))
speed = int(input("Enter the speed of the GIF (in milliseconds): "))
output_dir = "C:\\dogecoinarcade\\static\\images"

# Full path of the image
image_path = os.path.join(output_dir, image_name)

# Generate GIFs
dissolve_gif, appear_gif = dissolve_image(image_path, block_size, frames, speed, output_dir)
print(f"Dissolving GIF saved at {dissolve_gif}")
print(f"Appearing GIF saved at {appear_gif}")
