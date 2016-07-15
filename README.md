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
