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
    <img width="140" alt="image" src="./extension-src/firefox/images/fERP128.png">
  </a>
  
  <h3 align="center">fERP</h3>

  <p align="center">
    <i>Say goodbye to tedious feedback forms</i>
    <br />
    <a href="https://github.com/proffapt/fERP"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/proffapt/fERP/issues">Report Bug</a>
    ·
    <a href="https://github.com/proffapt/fERP/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#support">Support</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#using-scripts">Using Scripts</a></li>
        <li><a href="#installing-extension">Installing Extension</a></li>
        <ul>
          <li><a href="#firefox">Firefox</a></li>
          <li><a href="#chromium-based-browsers">Chromium Based Browsers</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#miscelleneous">Miscelleneous</a></li>    
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<img align="left" width="260" alt="image" src="https://user-images.githubusercontent.com/86282911/230757945-2229d143-2eef-40df-958c-269c6a3c919e.png">

The "fERP" extension is a tool designed to automate the process of filling feedback forms for course professors in IIT KGP. This extension saves your time and effort by automatically filling out the forms for you.

With the extension, you have three options for the **type of feedback**: `positive`, `negative`, or `neutral`. The extension generates _randomized feedback responses for each submission_, so you don't have to think of what to write each time.

There are **two modes available for using the extension**. The first mode allows you to select the type of feedback for each form submission, fill in the captcha, and then submit the form. The second mode allows you to select a common type of feedback for all forms and then fill in the captcha and submit each form in succession.

<div id="supports"></div>

### Support:
- Firefox
- [Chromium Based Browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This project has undergone some changes and now incorporates scripts into an extension. If you're having issues with the extension, don't worry! You can still use the scripts as standalone files. Below, I've outlined the different use cases for this project and linked to the relevant sections in this documentation.

- [Using Scripts](#using-scripts)
- [Installing Extension](#installing-extension)

### Using Scripts

These steps work fine on both Firefox and [Chromium Based Browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium).

1. Open the feedback form (`Academic` > `Feedback form`) of ERP.
2. Click on the subject code and the professor button.
3. Open console in browser.
   To do that, press ``F12`` for firefox & ``Ctrl + Shift + J`` in Chrome.
4. Copy the code from your desired variant of `*_feedback.js` from [scripts](./scripts) and paste in that console window and click `Run`.
5. All fields would be filled by now.
6. Fill up the captcha and submit.
    
> **Note** Firefox shows scam warning on copy pasting commands into the console!

To avoid that, simply enter the command `allow pasting` in the console.<br>
After running that command, copy pasting will start to work.

<p align="right">(<a href="#top">back to top</a>)</p>

### Installing Extension 

Currently, the extension is not available in any of the official extension/add-on stores. However, you can still install it using the available methods, which may be a bit tedious. In order to install the extension on any of the browser you will have to either [download](https://blog.hubspot.com/website/download-from-github?hubs_content=blog.hubspot.com/website/download-from-github&hubs_content-cta=downloading%20a%20repository#repository) or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository

Now, Refer to the sections below to read about further steps specific to your browser.

- [Firefox](#firefox)
- [Chromium Based Browser](#chromium-based-browsers)

#### Firefox

> **Note** Currently this extension is not available on add-on store but have sent it for review, steps will be updated as it is approved.

1. Open new tab and type `about:debugging#/runtime/this-firefox` on search bar.
2. Click on the `Load Temporary Add-on...` button under **Load Temporary Extensions** Section.
3. Navigate to [extension-src/firefox](./extension-src/firefox) folder in your opened file navigator.
4. Select the `manifest.json` file inside it and press **open**.


<p align="right">(<a href="#top">back to top</a>)</p>


#### Chromium Based Browsers

> **Note** Not published on Chrome Web Store - they require a fee for publishing an extension, and I don't earn :). However, if you would like to support the development of the extension and help me get it published on the Chrome web store, you can consider donating to me via the following link: https://github.com/sponsors/proffapt.

1. Open new tab and type `chrome://extensions` on search bar.
2. Toggle the **DEVELOPER MODE** on top right corner.
3. Click **LOAD UNPACKED** option, browse to the cloned folder and select the [extension-src/chrome](./extension-src/chrome) folder.

> **Warning** You have to select the whole folder not just any file.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

**Add usage video**

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap
<!-- UPDATE -->
- [x] Firefox Extension
- [x] Chrome Extension
- [ ] Captcha Automation

See the [open issues](https://github.com/proffapt/fERP/issues) for a full list of proposed features (and known issues).

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
