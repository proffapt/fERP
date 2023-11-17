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
<div align="center">
  <a href="https://github.com/proffapt/fERP">
     <img width="200" src="https://user-images.githubusercontent.com/86282911/230894496-b9402384-bf0a-4bf7-afbf-2207aa2d31be.png">
  </a> 
  <p align="center">
    <i>Automates the process of filling up feedback form in ERP for IIT KGP students</i>
  </p>
</div>

***

<table>
  <tr>
    <th>Mode 1</th>
    <th>Mode 2</th>
  </tr>
  <tr>
    <td>
    
  ![mode1][mode1-demo-gif]
  
  </td> 
  <td>
      
  ![mode2][mode2-demo-gif]
  
  </td>
  </tr>
  <tr>
  <td>

  - Automatically moves from one form to the next and fills it
  - Uses a common feedback type for all forms
  - Continues from the first unfilled form

  </td>
  <td>
    
  - Allows selecting feedback type for each individual form
  - User has the control over the order of form filling    

  </td>
  </tr>
  <tr>
  <td colspan="2" align="center">
      
  Form can be submitted by pressing `Enter` key just after typing the captcha
  
  </td>
  </tr>
  <tr>
  <td colspan="2" align="center">
    
  Has three feedback types, namely - `positive`, `negative` & `neutral`
  
  </td>
  </tr>
  <tr>
  <td colspan="2" align="center">
      
  Invoking a feedback type randomises the choice of _available options_
  
  </td>
  </tr>
  <tr>
    <td colspan="2" align="center">Re-fills the form with previously given feedback type, if wrong captcha was typed</td>
  </tr>
  <tr>
  <td colspan="2" align="center">

  <a href="https://addons.mozilla.org/en-US/firefox/addon/ferp/">
    <img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt="get fERP from mozilla add-on store" height="90">
  </a>
  <a href="https://chromewebstore.google.com/detail/ferp/cdmjkgfdjjebpjejjnckkgljdmijjnom">
    <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/86282911/282809759-ccf656ff-1874-49ac-bdca-a83281520b4c.jpg" alt="get fERP from chrome web store" height="90">
  </a>
      
  </td>
  </tr>
</table>

***

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#manual-installation">Manual Installation</a>
      <ul>
        <li><a href="#manual-chrome">Chrome</a></li>
        <li><a href="#manual-firefox">Firefox</a></li>
      </ul>
    </li>
    <li><a href="#standalone-scripts">Standalone Scripts</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#additional-documentation">Additional Documentation</a></li>    
  </ol>
</details>

## Manual Installation

It is recommended to install the extension from the respective extension stores for your browsers. However, if you encounter any problems, you can also manually install the extension from the source files in this repository.

<div id="manual-chrome"></div>

### Chrome

1. Either [download](https://blog.hubspot.com/website/download-from-github?hubs_content=blog.hubspot.com/website/download-from-github&hubs_content-cta=downloading%20a%20repository#repository) or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.
2. Open new tab and type `chrome://extensions` on search bar.
3. Toggle the **DEVELOPER MODE** on top right corner.
4. Click **LOAD UNPACKED** option, browse to the cloned folder and select the [extension-src/chrome](./extension-src/chrome) folder.

> [!Warning]
>  You have to select the whole folder not just any file in particular.

<div id="manual-firefox"></div>

### Firefox

1. Either [download](https://blog.hubspot.com/website/download-from-github?hubs_content=blog.hubspot.com/website/download-from-github&hubs_content-cta=downloading%20a%20repository#repository) or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.
2. Open new tab and type `about:debugging#/runtime/this-firefox` on search bar.
3. Click on the `Load Temporary Add-on...` button under **Load Temporary Extensions** Section.
4. Navigate to [extension-src/firefox](./extension-src/firefox) folder in your opened file navigator.
5. Select the `manifest.json` file inside it and press **open**.

<p align="right">(<a href="#top">back to top</a>)</p>

## Standalone Scripts

> [!Note]
> This project has undergone various significant changes and now incorporates "_my versions_" of "_feedback fiilling scripts_" into a browser extension which supports firefox, chrome and their derivatives.

- If you're facing any issues with the extension, don't worry! You can still use the [scripts](./scripts) as standalone files.
- The steps to use these scripts for both firefox and chrome are mentioned [here](./scripts/README.md).

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

* [Img Shields](https://shields.io)
* [Browser Extension - MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
* [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Additional Documentation

  - [License](/LICENSE.txt)
  - [Changelogs](/.github/CHANGELOG.md)
  - [Security Policy](/.github/SECURITY.md)
  - [Code Of Conduct](/.github/CODE_OF_CONDUCT.md)
  - [Contribution Guidelines](/.github/CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[mozilla-add-on-store-link]: https://addons.mozilla.org/en-US/firefox/addon/ferp/
[chrome-webstore-link]: https://chromewebstore.google.com/detail/ferp/cdmjkgfdjjebpjejjnckkgljdmijjnom
[firefox-shield]: https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg
[chrome-shield]: https://github-production-user-asset-6210df.s3.amazonaws.com/86282911/283838252-34120216-076d-46ab-8646-cd5845fd8eb5.jpg
[mode1-demo-gif]: https://github.com/proffapt/fERP/assets/86282911/36034a97-f732-44da-a907-b8218e2927fe
[mode2-demo-gif]: https://github.com/proffapt/fERP/assets/86282911/898114a1-e352-4d0e-9a68-e84a49e5d101
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
