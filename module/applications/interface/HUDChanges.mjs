export default class HUDChanges {
  static init() {
    let tokenHUDRender = function (wrapped, ...args) {
      let result = wrapped(...args).then((a, b) => {
        HUDChanges.alterHUD.call(this, this.element);
      });

      return result;
    }

    const oldTokenHUDRender = TokenHUD.prototype._render;
    TokenHUD.prototype._render = function (event) {
      return tokenHUDRender.call(this, oldTokenHUDRender.bind(this), ...arguments);
    }

    let getStatusEffectChoices = function (wrapped, ...args) {
      return wrapped(...args);
  }
    // let refreshStatusIcons = function () {
    //   const effects = this.element.find(".status-effects")[0];
    //   const statuses = this._getStatusEffectChoices();
    //   for (let img of $('[src]', effects)) {
    //     const status = statuses[img.getAttribute("src")] || {};
    //     img.classList.toggle("overlay", !!status.isOverlay);
    //     img.classList.toggle("active", !!status.isActive);
    //   }
    // }

    // TokenHUD.prototype.refreshStatusIcons = function (event) {
    //   return refreshStatusIcons.call(this);
    // }
  }

  static async alterHUD(html) {
    $('#token-hud').addClass('mnm3efvtt').toggleClass('highlight-image');

    for (let img of $('> img,> picture', '.col.right .control-icon[data-action="effects"] .status-effects')) {
      let src = $(img).attr('src');
      if (src == '') {
        $(img).css({ 'visibility': 'hidden' });
      } else {
        let title = $(img).attr('title') || $(img).attr('data-condition');

        $('<div>')
          .addClass('effect-container')
          .attr('title', title)
          .insertAfter(img)
          .append(img)
          .append($('<div>').addClass('effect-name').html(title)
          );
      }
    };
  }
}
