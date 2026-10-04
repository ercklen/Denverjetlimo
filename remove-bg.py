import os
from PIL import Image

images = [
    'public/fleet_maybach.png',
    'public/fleet_escalade.png',
    'public/fleet_yukon.png',
    'public/fleet_sprinter.png'
]

for img_path in images:
    if not os.path.exists(img_path):
        continue
    
    print(f"Processing {img_path}...")
    img = Image.open(img_path)
    img = img.convert("RGBA")
    
    data = img.getdata()
    new_data = []
    
    for item in data:
        # Check if the pixel is near-white (all channels > 240)
        # and not tinted (channels are close to each other)
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            # Change all near-white pixels to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(img_path, "PNG")
    print(f"Saved {img_path}")
