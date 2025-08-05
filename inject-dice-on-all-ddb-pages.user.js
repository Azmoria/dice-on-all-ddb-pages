// ==UserScript==
// @name         Inject Dice on all DDB pages
// @namespace    github.com/azmoria
// @version      0.02
// @description  Add dice to more DDB pages
// @author       Azmoria
// @downloadURL  https://github.com/Azmoria/dice-on-all-ddb-pages/raw/refs/heads/main/inject-dice-on-all-ddb-pages.user.js
// @updateURL    https://github.com/Azmoria/dice-on-all-ddb-pages/raw/refs/heads/main/inject-dice-on-all-ddb-pages.user.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @match        https://www.dndbeyond.com/*
// @exclude     https://www.dndbeyond.com/*abovevtt*
// @exclude     https://www.dndbeyond.com/*encounter*
// @exclude     https://www.dndbeyond.com/*character*
// @exclude     /^https://www.dndbeyond.com/campaigns/\d+$/

// @run-at       document-end

// ==/UserScript==

(function() {
    'use strict';
    inject_dice()
})();

function inject_dice(){
  window.encounterObserver = new MutationObserver(function(mutationList, observer) {

    mutationList.forEach(mutation => {
      try {
        let mutationTarget = $(mutation.target);
        //Remove beyond20 popup and swtich to gamelog
        if(mutationTarget.hasClass(['encounter-details', 'encounter-builder', 'release-indicator'])){
          mutationTarget.remove();

        }
        if($(mutation.addedNodes).is('.encounter-builder, .release-indicator')){
          $(mutation.addedNodes).remove();
        }

      } catch{
        console.warn("non_sheet_observer failed to parse mutation", error, mutation);
      }
    });
  })


  const mutation_target = $('body')[0];
  //observers changes to body direct children being removed/added
  const mutation_config = { attributes: false, childList: true, characterData: false, subtree: true };
  window.encounterObserver.observe(mutation_target, mutation_config)

  $('body').append(`

<div class="container">

        <div id="encounter-builder-root" data-config="{&quot;diceApi&quot;:&quot;https://dice-service.dndbeyond.com&quot;,&quot;featureFlagsDomain&quot;:&quot;https://api.dndbeyond.com&quot;,&quot;mediaBucket&quot;:&quot;https://media.dndbeyond.com&quot;}" >
          <div class="encounter-details">
           </div>
           <div class="dice-rolling-panel">
              <div class="dice-toolbar  ">
                 <div class="dice-toolbar__dropdown ">
                    <div class=" dice-toolbar__dropdown-die"><span class="dice-icon-die dice-icon-die--d20"></span></div>
                    <div role="group" class="MuiButtonGroup-root MuiButtonGroup-outlined dice-toolbar__target css-3fjwge" aria-label="roll actions">
                       <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedOutlined MuiButtonGroup-groupedOutlinedHorizontal MuiButtonGroup-groupedOutlinedPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedOutlined MuiButtonGroup-groupedOutlinedHorizontal MuiButtonGroup-groupedOutlinedPrimary css-79xub" tabindex="0" type="button">
                          <div class="MuiBox-root css-dgzhqv">
                             <p class="MuiTypography-root MuiTypography-body1 dice-toolbar__target-roll css-9l3uo3">Roll</p>
                          </div>
                       </button>
                    </div>
                    <div class="dice-toolbar__dropdown-top" style="display: none;">
                       <div class="dice-die-button" data-dice="d20">
                          <span class="dice-icon-die dice-icon-die--d20"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d20
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d12">
                          <span class="dice-icon-die dice-icon-die--d12"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d12
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d10">
                          <span class="dice-icon-die dice-icon-die--d10"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d10
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d100">
                          <span class="dice-icon-die dice-icon-die--d100"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d100
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d8">
                          <span class="dice-icon-die dice-icon-die--d8"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d8
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d6">
                          <span class="dice-icon-die dice-icon-die--d6"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d6
                          </div>
                       </div>
                       <div class="dice-die-button" data-dice="d4">
                          <span class="dice-icon-die dice-icon-die--d4"></span>
                          <div class="dice-die-button__tooltip">
                             <div class="dice-die-button__tooltip__pip"></div>
                             d4
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <canvas class="dice-rolling-panel__container" width="1917" height="908" data-engine="Babylon.js v6.3.0" touch-action="none" tabindex="1" style="touch-action: none; -webkit-tap-highlight-color: transparent;"></canvas>
           </div>
        </div>
        <script src="https://media.dndbeyond.com/encounter-builder/static/js/main.221d749b.js"></script>
        <link rel="stylesheet" href="https://media.dndbeyond.com/game-log-client/css/_dndbeyond_game_log_client.f9120ac7.css" />
         <style>
          .dice-rolling-panel,.dice-rolling-panel__container {
              width: 100%;
              height: 100%;
              position: fixed;
              top: 0;
              pointer-events: none;
              left: 0;
              z-index: 10000000;
          }

          .dice-rolling-panel .dice-toolbar {
              position: fixed;
              z-index: 1;
              bottom: 10px;
              left: 10px;
              pointer-events: all
          }
        </style>
  </div>
  `);
}
