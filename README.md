# Image Shrinking Service
This service allows you to post an image and receive a compressed and/or modified image as the return object.

---

## REST Signature
Following is a list of parameters that the service accepts. Requests should be sent to <code>http://svc.apprad.us/shrink</code> using a POST request.

<table class="table table-bordered">
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image being processed as an image object reference</td>
    <td>Y</td>
    <td>n/a</td>
  </tr>
  <tr>
    <td>action</td>
    <td>Action which you wish to perform. Available options are: default, hero, icon, avatar, thumbnail</td>
    <td>N</td>
    <td>default</td>
  </tr>
  <tr>
    <td>filename</td>
    <td>Filename which you wish the generated file to be returned with</td>
    <td>N</td>
    <td>image.png</td>
  </tr>
</table>


## Action Options
Following is a description of each available <code>action</code> parameter.
New actions can be defined in the file <code>{root}/shrinkage/conf/actions.json</code>.

### default
Compresses an image and converts to jpeg without altering the dimensions.
* Size: (unchanged),
* Format: jpeg
* Quality: 50

### hero
Resizes an image for placement in a hero.
* Size: width: 640, height: 480
* Format: png
* Level: 7,
* Crop: true

### icon
Resizes an image for use as an icon.
* Size: width: 50, height: 50
* Format: png
* Level: 7,
* Crop: true

### avatar
Resizes an image for use as an avatar.
* Size: width: 80, height: 80
* Format: png
* Level: 7,
* Crop: true

### thumbnail
Resizes an image for use as a thumbnail.
* Size: width: 250, height: 100
* Format: png
* Level: 7,
* Crop: true

### sample
Samples a section from the image.
* Size: width: 150, height: 150
* Format: png
* Level: 4,
* Crop: true
* Extract: top:300, left:100

### invert
Inverts the color profile of an image.
* Size: (unchanged)
* Format: png
* Level: 4,
* Invert: true

### rotate-90
Rotates an image 90 deg. clockwise
* Size: (unchanged)
* Format: png
* Level: 4,
* Rotate: 90

### rotate-180
Rotates an image 180 deg. clockwise
* Size: (unchanged)
* Format: png
* Level: 4,
* Rotate: 180

### rotate-270
Rotates an image 270 deg. clockwise
* Size: (unchanged)
* Format: png
* Level: 4,
* Rotate: 270

### flip
Mirrors an image vertically.
* Size: (unchanged)
* Format: png
* Level: 4,
* Flip: true

### flop
Mirrors an image horizontally.
* Size: (unchanged)
* Format: png
* Level: 4,
* Flop: true

### kltpzyxm
Creates an inverse image that is flipped vertically and horizontally; possibly sends you to the 5th dimension.
* Size: width: 640, height: null
* Format: png
* Level: 5
* Invert: true
* Flip: true
* Flop: true


### Action Option Schema
Actions can be defined using the following available parameters:

<table class="table table-bordered">
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>size</td>
    <td>Object defining the width and height of the resulting image. Either width or height can be made relative by providing the value of "null". Object definition: <code>{w:640,h:"null"}</code></td>
    <td>N</td>
    <td>{}</td>
  </tr>
  <tr>
    <td>format</td>
    <td>File format for the generated file. Available options: <code>png jpeg webp raw</code>.</td>
    <td>N</td>
    <td>png</td>
  </tr>
  <tr>
    <td>crop</td>
    <td>Does the resize option constrain the image, or does it crop the image? Boolean <code>true</code> or <code>false</code>.</td>
    <td>N</td>
    <td>false</td>
  </tr>
  <tr>
    <td>extract</td>
    <td>Object defining which section of the image to extract. Used in conjunction with <code>resize</code> which sets the physical size of the extracted section. Object definition: <code>{left:0, top:0}</code>.</td>
    <td>N</td>
    <td>false</td>
  </tr>
  <tr>
    <td>level</td>
    <td>An advanced setting for the zlib compression level of the lossless PNG output format.</td>
    <td>N</td>
    <td>6</td>
  </tr>
  <tr>
    <td>quality</td>
    <td>The output quality to use for lossy JPEG, WebP and TIFF output formats.</td>
    <td>N</td>
    <td>80</td>
  </tr>
  <tr>
    <td>rotate</td>
    <td>Sets the angle of rotation for the target image. Specify values in positive and negative integers between -360 and 360.</td>
    <td>N</td>
    <td>false</td>
  </tr>
  <tr>
    <td>invert</td>
    <td>Produces the "negative" of the image. White => Black, Black => White, Blue => Yellow, etc. Boolean <code>true</code> or <code>false</code>.</td>
    <td>N</td>
    <td>false</td>
  </tr>
  <tr>
    <td>flip</td>
    <td>Flip the image on the vertical Y axis. This always occurs after rotation, if any. Boolean <code>true</code> or <code>false</code>.</td>
    <td>N</td>
    <td>false</td>
  </tr>
  <tr>
    <td>flop</td>
    <td>Flop the image on the horizontal X axis. This always occurs after rotation, if any. Boolean <code>true</code> or <code>false</code>.</td>
    <td>N</td>
    <td>false</td>
  </tr>
</table>
