<!DOCTYPE html>
<html lang="de">

<head>
    <link rel="stylesheet" href="templates/zh11/css/style.min.css?V2019-04-25">
    <link rel="manifest" href="https://zh11.ch/templates/zh11/manifest.json"

    <link rel="icon" href="https://zh11.ch/images/apple-touch-icon-144x144.png">
    <link rel="shortcut icon" href="https://zh11.ch/images/apple-touch-icon-144x144.png">

    <link rel="apple-touch-icon" sizes="152x152" href="templates/zh11/res/logos/apple_logo_192x192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="templates/zh11/res/logos/apple_logo_192x192.png">
    <link rel="apple-touch-icon" sizes="167x167" href="templates/zh11/res/logos/apple_logo_192x192.png">
    <link rel="apple-touch-icon" href="templates/zh11/res/logos/apple_logo_192x192.png">
    <link rel="apple-touch-startup-image" href="templates/zh11/res/logos/apple_logo_192x192.png">

    <title><?php echo JFactory::getDocument()->getTitle();?></title>

    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=1">
    <meta name="apple-mobile-web-app-capable" content="yes">


    <base href="<?php echo JUri::base();?>"/>

    <meta charset="UTF-8"/>
    <meta name="rights" content="Cevi Züri 11"/>
    <meta name="keywords" content="<?php echo JFactory::getDocument()->getMetaData("keywords");?>"/>
    <meta name="description" content="<?php echo JFactory::getDocument()->getMetaData("description");?>"/>
    <meta property="og:title" content=<?php echo JFactory::getDocument()->getTitle();?>>
    <meta property="og:image" content="/templates/zh11/images/logo.svg">

    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#fff">

    <?php
    header_remove("X-Powered-By");
    header ( "Expires: 604800" );

    header ( "Last-Modified: " . gmdate ( "D, d M Y H:i:s" ) . " GMT" );
    ?>

  </head>

<body>
    <!-- Header -->
    <header>
      <img id="mainM" src="templates/zh11/res/icons/menu.svg" width="30" heigth="30" alt="Hauptmenu">

        <nav id="mainMD" class="menu" onmouseover="mouseStatus(true)" onmouseout="mouseStatus(false)">
            <a class="iconText" href="/"><img class="logo" src="templates/zh11/res/logos/logo.svg" width="30" heigth="30" alt="Logo Cevi Züri 11"> <span class="logoName">Cevi Züri 11</span> <span class="logoSubname">8052 Zürich</span></a>
            <hr>
            <jdoc:include type="modules" name="navigation" style="xHtml" />
        </nav>

        <a href="/" class="noStyle"><span id="headerTitle" class="logoName">Cevi Züri 11</span></a>
        <a href="/" class="noStyle"><img class="logo" src="templates/zh11/res/logos/logo.svg" width="30" heigth="30" alt="Logo des Cevi Züri 11"></a>
      </header>

    <main id="main"><jdoc:include type="component" /></main>

    <!-- Footer -->
    <footer>
        <!-- Navigation im Footer -->
      <ul class="menu">
                    <li><a href="/kontakt" rel="noopener noreferrer">Kontakte</a></li>
            <li><a href="/download">Download</a></li>
            <li><a href="/impressum" title="Impressum | Datenschutzbestimmungen | Haftungsausschluss">Impressum</a></li>
        </ul>
        <div class="socials">
            <a id="face" href="https://www.facebook.com/share.php?v=4&amp;src=bm&amp;u=https://zh11.ch/sola" title="Facebook" target="_blank" rel="noopener"></a>
            <a id="twit" href="https://twitter.com/share?url=https://zh11.ch/sola" title="Twitter" target="_blank" rel="noopener"></a>
            <a id="pint" href="https://pinterest.com/pin/create/button/?url=https://zh11.ch/sola" title="Pinterest" target="_blank" rel="noopener"></a>
            <a id="insta" href="https://www.instagram.com/cevizh11/" title="Instagram" target="_blank" rel="noopener"></a>
        </div>
        <div id="copyright">
            <p>© 2019 Cevi Züri 11<br><a href="https://zh11.ch/web-admin">Made by Cyrill Püntener v/o JPG with &#9825;</a></p>
        </div>
    </footer>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-84503315-1"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async defer>
      </script>

    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-84503315-1');
    </script>

    <!-- Script erst am Schluss laden; besserer ladeperformance-->
    <script async language="javascript" type="text/javascript" src="templates/zh11/js/global.min.js?V2019-04-25"></script><noscript><p>Diese Seite verwendet JavaScript. Bitte erlaube die Verwendung von JavaScript in deinem Browser.</p></noscript></body>
    </html>
