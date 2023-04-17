import resources from './resources.js'


// Black Screen Test
me.device.onReady(function () {
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(1218, 562, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }
    me.loader.load({ name : "tileset.png", type: "image",    src:"map/tileset.png"})
    // me.loader.load({ name : "0-1",   type: "tmx",   src:"map/0-1.tmx"})
    // me.game.world.addChild(new me.ColorLayer("background", "#202020"));
});


