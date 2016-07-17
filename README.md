# Image Shrinking Service
This service allows you to post an image and receive a compressed and/or modified image as the return object.

## REST Signature
Following is a list of POST parameters that the service accepts.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>image</td>
    <td>Image being processed as an image object reference</td>
    <td>x</td>
    <td>n/a</td>
  </tr>
  <tr>
    <td>action</td>
    <td>Action which you wish to perform. Available options are: default, hero, icon, avatar, thumbnail</td>
    <td>-</td>
    <td>default</td>
  </tr>
  <tr>
    <td>filename</td>
    <td>Filename which you wish the generated file to be returned with</td>
    <td>-</td>
    <td>image.png</td>
  </tr>
</table>


## Action Options
Following is a description of each available <code>action</code> option parameter.

### default
Compresses an image and converts to jpeg without altering the dimensions.
* Size: {},
* Format: jpeg
* Level: 4,
* Quality: 50

### hero
Resizes an image for placement in a hero.
* Size: {w:640,h:480}
* Format: png
* Level: 7,
* Crop: true

### icon
Resizes an image for use as an icon.
* Size: {w:50,h:50}
* Format: png
* Level: 7,
* Crop: true

### avatar
Resizes an image for use as an avatar.
* Size: {w:80,h:80}
* Format: png
* Level: 7,
* Crop: true

### thumbnail
Resizes an image for use as a thumbnail.
* Size: {w:250,h:100}
* Format: png
* Level: 7,
* Crop: true

### sample
Samples a section from the image.
* Size: {w:150,h:150}
* Format: png
* Level: 4,
* Crop: true
* Extract: {top:300,left:100}

### invert
Inverts the color profile of an image.
* Size: {}
* Format: png
* Level: 4,
* Invert: true

### rotate-90
Rotates an image 90 deg. clockwise
* Size: {}
* Format: png
* Level: 4,
* Rotate: 90

### rotate-180
Rotates an image 180 deg. clockwise
* Size: {}
* Format: png
* Level: 4,
* Rotate: 180

### rotate-270
Rotates an image 270 deg. clockwise
* Size: {}
* Format: png
* Level: 4,
* Rotate: 270

### flip
Mirrors an image vertically.
* Size: {}
* Format: png
* Level: 4,
* Flip: true

### flop
Mirrors an image horizontally.
* Size: {}
* Format: png
* Level: 4,
* Flop: true

### kltpzyxm
Creates an inverse image that is flipped vertically and horizontally; possibly sends you to the 5th dimension.
* Size: {w:640,h:null}
* Format: png
* Level: 5
* Invert: true
* Flip: true
* Flop: true
