# Simply-Light
A simple Night Light designed for Fitbit Versa.<br>
A simple night light with a choice of 6 colours.<br>
<img src="/Screenshots/logonl.png" width="150" hight="150"><img src="/Screenshots/simply-light.png" width="150" hight="150"><img src="/Screenshots/simply-light-1.png" width="150" hight="150"><img src="/Screenshots/simply-light-2.png" width="150" hight="150"><img src="/Screenshots/simply-light-3.png" width="150" hight="150"></br>
Perfect when you need a light but don't want to disturb everyone.<br>
Press the centre of the screen to toggle blackout on/off.<br>
Press the cog to access settings;<br>
- Choose from one of 6 colours (Blue, Purple, Red, Orange, Green and White).<br>
- Choose the brightness of the screen.<br>
- The chosen setting will be saved.<br>

# Settings the brightness
The the levels of brightness/darkness are created using Image Grayscale Magic!.<br>
I created a number of grayscale images with diffrent values of gray.</br>
I used this site to caluclate the diffrent values. https://meyerweb.com/eric/tools/color-blend/#000000:FFFFFF:5:rgbd </br>
I then set the fill of this image to fb-black, which created diffrent dark transparencies.</br>
This allowed the background image to be displayed but to become brighter or darker depending on background image.</br>
This is how I enabled the brightness/darkness of the display.<br>

# Image Grayscale Magic!
Grayscale images can be colored dynamically with the fill property. The black area of an image will be fully transparent (0) and the white will be fully opaque (255). All the mid-gray areas will inherit opacity according to their depth of color (0 - 255).

Note: The image must be 8-bit PNG format.</br>

Example Code:
<div class="codeWrap app">
<pre class="language-markup"><code class="language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation"><b>resources</b></br>
&lt;</span>svg</span>&gt;</span></span></br>
&lt;</span>image id="brightness" width="100%" height="100%" href="gray-1.png" fill="fb-black" opacity="1" /</span>&gt;</span></span></br>
&lt;/</span>svg</span>&gt;</span></span></br>
</br>
<b>app</b></br>
display.brightnessOverride = 0.0;</br>
</code></pre>
</div>

Aside from making UI more adjustable to color changes, the use of grayscale images reduces the size memory usage by a factor of 4.

You can generate images in the correct format by using the following; 

 ImageMagick command: convert original.png -colorspace gray final.png

 Adobe Photoshop Image -> Mode -> Grayscale, 8 Bits/Channel.
