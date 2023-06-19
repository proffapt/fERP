<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/proffapt/fERP">
     <img width="200" src="https://user-images.githubusercontent.com/86282911/230894496-b9402384-bf0a-4bf7-afbf-2207aa2d31be.png">
  </a>
  
  <p align="center">
    <i>Say goodbye to tedious feedback forms</i>
    <br />
    <br />
    <a href="https://addons.mozilla.org/en-US/firefox/addon/ferp/">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fes.wizcase.com%2Fwp-content%2Fuploads%2F2020%2F01%2FFirefox-logo.png&f=1&nofb=1&ipt=54f117ea1a647cfa7750fd723a289fda26463932664b2b800f59b082de9e48b1&ipo=images" alt="get fERP from firefox add-on store" height="40">
    </a>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#chrome">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpnggrid.com%2Fwp-content%2Fuploads%2F2021%2F04%2FGoogle-Chrome-Logo-2048x2048.png&f=1&nofb=1&ipt=7d784732ee026c2c5396637c525dbae3d1e9ae67a2d45dfc0dcf593e0aa5c1b6&ipo=images" alt="get fERP from chrome web store" height="40">
    </a>
    <br />
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installing-extension">Installing Extension</a></li>
        <ul>
          <li><a href="#chrome">Chrome</a></li>
          <li><a href="#firefox">Firefox</a></li>
        </ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#miscelleneous">Miscelleneous</a></li>    
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<img align="left" width="290" alt="image" src="https://github.com/proffapt/fERP/assets/86282911/d66c5b20-8c20-4c95-ba2a-220d509ed0ed">

The `fERP` extension is a tool designed to automate the process of filling feedback forms for course professors in IIT KGP. This extension saves your time and effort by automatically filling out the forms for you.

With the extension, you have three options for the **type of feedback**: `positive`, `negative`, or `neutral`. The extension generates _randomized feedback responses for each submission_, so you don't have to think of what to write each time.

There are **two modes available for using the extension**. The first mode allows you to select the type of feedback for each form submission, fill in the captcha, and then submit the form. The second mode allows you to select a common type of feedback for all forms and then fill in the captcha and submit each form in succession.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This project has undergone some changes and now incorporates scripts into an extension. If you're having issues with the extension, don't worry! You can still use the [scripts](./scripts) as standalone files. 

### Installing Extension 

The extension is available on [Firefox Add-on Store](https://addons.mozilla.org/en-US/firefox/) but not on [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) thus you will have to install it manually.

> **Note** If you would like to support the development of the extension and help me get it published on the Chrome web store, you can consider donating to me via the following link: https://github.com/sponsors/proffapt.

#### Chrome

<!--

<a href="https://chrome.google.com/webstore/detail/ferp/6969696969696969696969696969">
  <img src="https://d1kzoyopflesfg.cloudfront.net/wp-content/uploads/2018/11/15064102/ChromeWebStore_Badge_v2_496x150.png" alt="get fERP from chrome web store" height="70">
</a>

-->

  1. Either [download](https://blog.hubspot.com/website/download-from-github?hubs_content=blog.hubspot.com/website/download-from-github&hubs_content-cta=downloading%20a%20repository#repository) or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.
  2. Open new tab and type `chrome://extensions` on search bar.
  3. Toggle the **DEVELOPER MODE** on top right corner.
  4. Click **LOAD UNPACKED** option, browse to the cloned folder and select the [extension-src/chrome](./extension-src/chrome) folder.

  > **Warning** You have to select the whole folder not just any file.

<p align="right">(<a href="#top">back to top</a>)</p>

#### Firefox

<a href="https://addons.mozilla.org/en-US/firefox/addon/ferp/">
  <img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt="get fERP from mozilla add-on store" height="60">
</a>

For android you can use this extension on [Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix&hl=en&gl=US) version of Firefox. [Follow this article](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly/) to set it up.


<p align="right">(<a href="#top">back to top</a>)</p>

### Features

- In default mode after filling one form it moves on to next form, be it professor or course.
  - Continues from the point where first unfilled form exist.
- Other mode gives user independance of choosing the feedback type for every form.
- Re-fills the form when it fails to submit for some reason, like - wrong captcha.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

- `Method 1 [Default]`: Just select the feedback type __once__ - `fill captcha then submit > fill cpatcha then submit > repeat`.

   https://user-images.githubusercontent.com/86282911/230883818-0a042a7b-5db9-4690-b7a3-190d69ef3b50.mp4
   
- `Method 2`: Un-select the checkbox - Select fedback type for each professor separately.

   https://user-images.githubusercontent.com/86282911/230883454-5f94fbb0-980c-4dbf-b661-2bb425c11586.mp4

   <br>
   
   > **Note** The form can be submitted just by pressing `Enter` key after filling the captcha.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

<p>
📫 Arpit Bhardwaj ( aka proffapt ) -   

<a href="https://twitter.com/proffapt">
  <img align="center" alt="proffapt's Twitter " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/twitter.svg" />
</a>
<a href="https://t.me/proffapt">
  <img align="center" alt="proffapt's Telegram" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/telegram.svg" />
</a>
<a href="https://www.linkedin.com/in/proffapt/">
  <img align="center" alt="proffapt's LinkedIn" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/linkedin.svg" />
</a> 
<a href="mailto:proffapt@pm.me">
  <img align="center" alt="proffapt's mail" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/mail.svg" />
</a> 
<a href="https://cybernity.group">
  <img align="center" alt="proffapt's forum for cybernity" width="22px" src="https://cybernity.group/uploads/default/original/1X/a8338f86bbbedd39701c85d5f32cf3d817c04c27.png" />
</a> 
</p>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Img Shields](https://shields.io)
* [Browser Extension - MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

<p align="right">(<a href="#top">back to top</a>)</p>

## Miscelleneous

Do consider looking at other paradigms of this documentation
  - [Change-logs](/.github/CHANGELOG.md)
  - [License used](/LICENSE.txt)
  - [Code Of Conduct](/.github/CODE_OF_CONDUCT.md)
  - [How to contribute?](/.github/CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/proffapt/fERP.svg?style=for-the-badge
[contributors-url]: https://github.com/proffapt/fERP/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/proffapt/fERP.svg?style=for-the-badge
[forks-url]: https://github.com/proffapt/fERP/network/members
[stars-shield]: https://img.shields.io/github/stars/proffapt/fERP.svg?style=for-the-badge
[stars-url]: https://github.com/proffapt/fERP/stargazers
[issues-shield]: https://img.shields.io/github/issues/proffapt/fERP.svg?style=for-the-badge
[issues-url]: https://github.com/proffapt/fERP/issues
[license-shield]: https://img.shields.io/github/license/proffapt/fERP.svg?style=for-the-badge
[license-url]: https://github.com/proffapt/fERP/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/proffapt
