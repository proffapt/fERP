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
        <li><a href="#using-scirpts">Using Scripts</a></li>
        <li><a href="#using-extension">Using Extension</a></li>
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
1. **Extension**
    - Firefox

2. **Scripts**
    - Chromium
    - Firefox

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Please note that the fERP is currently only compatible with Firefox. If you are using a Chromium-based browser, you can still use the [scripts](./scripts). I am constantly working to make the extension available on other browsers as well, so stay tuned for updates. You can follow the sections below according to your preference:
- [Using Scripts](#using-scripts)
- [Using Extension](#using-extension)

### Using Scripts

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

### Using Extension 

> **Note** Only supports Firefox for now.

1. Clone this branch using `git clone https://github.com/proffapt/fERP`
2. Open `Firefox` and paste `about:debugging#/runtime/this-firefox` into the search/url bar.
3. Click on `Load Temperory Add-on..`, a file explorer window will pop-up
4. Navigate to the cloned repository directory and select `manifest.json` file inside [extension-src/firefox](./extension-src/firefox).
5. The extension will be loaded in your browser.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
<!-- UPDATE -->
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space.

<div align="center">
  <a href="https://github.com/proffapt/fERP">
    <img width="1006" alt="image" src="https://user-images.githubusercontent.com/86282911/206632640-40dc440e-5ef3-4893-be48-618f2bd85f37.png">
  </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap
<!-- UPDATE -->
- [x] Firefox Extension
- [ ] Chrome Extension
- [ ] Captcha automation

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
