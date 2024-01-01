from PIL import Image

def clean_image(img):
    diff_value = 70
    img = img.convert('L')
    h, w = img.size

    # make background white
    for i in range(h):
        for j in range(w):
            if img.getpixel((i, j)) < diff_value:
                img.putpixel((i, j), 0)
            else:
                img.putpixel((i, j), 255)

    # remove vertical lines
    for i in range(h-1):
        for j in range(w-1):
            if (img.getpixel((i, j)) != img.getpixel((i-1, j))) and (img.getpixel((i, j)) != img.getpixel((i+1, j))):
                img.putpixel((i, j), 255)

    # remove horizontal lines
    for i in range(h-1):
        for j in range(w-1):
            if img.getpixel((i, j)) == img.getpixel((i+1, j)):
                if (img.getpixel((i, j)) != img.getpixel((i, j-1)) and img.getpixel((i, j)) != img.getpixel((i, j+1))):
                    img.putpixel((i, j), 255)

    #clean edges
    for i in range(h-1):
        img.putpixel((i, w-1), 255)
        img.putpixel((i, w-2), 255)
    for i in range(w-1):
        img.putpixel((h-1, i), 255)

    return img